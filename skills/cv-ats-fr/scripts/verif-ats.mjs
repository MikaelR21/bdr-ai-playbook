// Deux scores séparés sur 100 : lisibilité ATS (barème inspiré de career-ops) et qualité du contenu.
// Vérifie aussi les champs reconnus et écrit texte-extrait.txt (ce que lit l'ATS) à côté du HTML.
// Usage : node verif-ats.mjs <cv.html> [cv.pdf] [pages attendues, défaut 1]
// Code de sortie 1 si un problème critique est détecté.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { norm, readText } from "./lib.mjs";

const [, , htmlPath, pdfPath, pagesArg] = process.argv;
if (!htmlPath) {
  console.error("Usage : node verif-ats.mjs <cv.html> [cv.pdf] [pages attendues]");
  process.exit(1);
}
const html = readFileSync(htmlPath, "utf8");
const text = readText(htmlPath);
const t = norm(text);
const css = (html.match(/<style[\s\S]*?<\/style>/gi) || []).join(" ") + " " + (html.match(/style="[^"]*"/gi) || []).join(" ");
const lignes = [];
const critiques = [];
let score = 0;
const add = (pts, max, label, detail = "") => {
  score += pts;
  lignes.push({ critère: label, points: `${pts}/${max}`, détail: detail });
};

// 1. Vrai texte (15)
const chars = text.replace(/\s/g, "").length;
add(chars >= 300 ? 15 : 0, 15, "Texte réel", `${chars} caractères`);
if (chars < 300) critiques.push("Moins de 300 caractères de texte : l'ATS ne lira presque rien.");

// 2. Titres standards (20) : 3 obligatoires
const titres = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => norm(m[1].replace(/<[^>]+>/g, "")));
const obligatoires = [["experiences professionnelles", "experience professionnelle", "experiences"], ["formation", "formations"], ["competences"]];
const trouves = obligatoires.filter((alts) => titres.some((h) => alts.includes(h)));
add(Math.round((trouves.length / 3) * 20), 20, "Titres standards", `${trouves.length}/3 (Expériences professionnelles, Formation, Compétences)`);

// 3. E-mail dans le corps (15)
const body = html.replace(/<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>/gi, " ");
const emailCorps = /[\w.+-]+@[\w-]+\.[\w.]+/.test(readTextFromString(body));
add(emailCorps ? 15 : 0, 15, "E-mail en clair dans le corps", emailCorps ? "" : "introuvable hors en-tête/pied de page");

// 4. Une seule colonne (20)
const tableau = /<table/i.test(html);
const colonnes = /column-count|columns\s*:|display\s*:\s*grid|display\s*:\s*flex|float\s*:\s*(left|right)/i.test(css);
add(!tableau && !colonnes ? 20 : 0, 20, "Une seule colonne", tableau ? "tableau détecté" : colonnes ? "colonnes, grille, flex ou float détectés" : "");
if (tableau) critiques.push("Tableau de mise en page : l'ordre de lecture risque d'être mélangé.");

// 5. Pas d'image (10)
const images = /<img|<svg|background-image/i.test(html);
add(images ? 0 : 10, 10, "Aucune image", images ? "image ou SVG détecté : rien d'important ne doit y être" : "");

// 6. Polices système (10)
const polices = !/@font-face|fonts\.googleapis|fonts\.gstatic/i.test(html) && /arial|helvetica|calibri|sans-serif/i.test(css);
add(polices ? 10 : 0, 10, "Police système", polices ? "" : "police web ou non standard");

// 7. UTF-8 (5)
const utf8 = /<meta[^>]+charset=["']?utf-8/i.test(html);
add(utf8 ? 5 : 0, 5, "Encodage UTF-8", "");

// 8. Pas de texte caché (5)
const cache = /display\s*:\s*none|visibility\s*:\s*hidden|font-size\s*:\s*[0-5](\.\d+)?(px|pt)|color\s*:\s*(#fff\b|#ffffff|white)/i.test(css);
add(cache ? 0 : 5, 5, "Aucun texte caché", cache ? "texte caché ou blanc détecté" : "");
if (cache) critiques.push("Texte caché ou blanc : considéré comme de la triche par les ATS et les recruteurs.");

// Contrôles complémentaires (sans points)
const remarques = [];
if (/(19|20)\d{2}\s*[‐-―−]|[‐-―−]\s*(19|20)\d{2}/.test(text)) remarques.push("Dates avec un tiret long : utilise un tiret simple « - ».");
if (/—/.test(text)) remarques.push("Tiret long (—) dans le texte.");
if (/en cours/i.test(text) === false && /bachelor|master|bts|licence|but\b|mba|diplome/i.test(t) && /aujourd/i.test(t)) remarques.push("Formation sans « en cours » : vérifie qu'un diplôme non obtenu est bien signalé comme en cours.");

// PDF : nombre de pages et couche texte
if (pdfPath) {
  if (!existsSync(pdfPath)) critiques.push(`PDF introuvable : ${pdfPath}`);
  else {
    const pdf = readFileSync(pdfPath).toString("latin1");
    const pages = (pdf.match(/\/Type\s*\/Page(?!s)/g) || []).length;
    const attendu = Number(pagesArg || 1);
    const texteOk = /\/ToUnicode/.test(pdf);
    console.log(`PDF : ${pages} page(s) (attendu ${attendu}), couche texte ${texteOk ? "présente" : "ABSENTE"}`);
    if (pages !== attendu) remarques.push(`Le PDF fait ${pages} page(s) au lieu de ${attendu} : coupe les lignes les moins pertinentes.`);
    if (!texteOk) critiques.push("PDF sans couche texte extractible : l'ATS ne pourra pas le lire.");
  }
}

function readTextFromString(s) {
  return s.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
}

if (/letter-spacing\s*:\s*(0?\.[3-9]|[1-9])/i.test(css)) remarques.push("Lettres espacées (letter-spacing) : certains ATS lisent des lettres isolées. Supprime-le.");

// Champs reconnus (ce qu'un ATS doit pouvoir ranger)
const champs = [];
const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
champs.push(["Nom", !!(h1 && h1.replace(/<[^>]+>/g, "").trim())]);
champs.push(["E-mail", /[\w.+-]+@[\w-]+\.[\w.]+/.test(text)]);
champs.push(["Téléphone", /(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}|\+\d{2,3}[\s\d]{8,}/.test(text)]);
const postes = [...html.matchAll(/<div class="poste">([\s\S]*?)<\/div>/gi)].map((m) => m[1]);
const sansDate = postes.filter((p) => !/\d{2}\/\d{4}|(19|20)\d{2}/.test(p.replace(/<[^>]+>/g, " ")));
champs.push([`Dates de chaque poste (${postes.length - sansDate.length}/${postes.length})`, postes.length > 0 && sansDate.length === 0]);
champs.push(["Formation", titres.some((h) => h.startsWith("formation"))]);
champs.push(["Compétences", titres.includes("competences")]);
console.log("\nCHAMPS RECONNUS");
champs.forEach(([n, ok]) => console.log(`  ${ok ? "✓" : "✗"} ${n}`));
champs.filter(([, ok]) => !ok).forEach(([n]) => remarques.push(`Champ non reconnu : ${n}.`));

// Ce que lit l'ATS, dans l'ordre
const extraitPath = htmlPath.replace(/[^\\/]+$/, "texte-extrait.txt");
writeFileSync(extraitPath, text.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n"), "utf8");
console.log(`\nTexte lu par l'ATS écrit dans : ${extraitPath}`);

// Score de qualité du contenu (séparé de la lisibilité)
const puces = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).filter(Boolean);
// Verbe d'action en tête de ligne : participe passé français, ou verbe anglais au passé (CV en anglais).
const EN_IRREGULIERS = /^(Led|Built|Ran|Grew|Won|Drove|Made|Sold|Wrote|Set|Cut|Took|Brought|Taught|Held|Kept|Found|Gave|Met|Spent|Shipped|Oversaw|Overhauled|Rebuilt)(?=[\s,.;:()]|$)/;
const verbe = (s) => /^[A-ZÉÈÀÂÎÔ][a-zéèêàâîôûç]+(é|ée|és|ées|i|is|it|u|ue|er|ir|re)(?=[\s,.;:()]|$)/.test(s) || /^[A-Z][a-z]+ed(?=[\s,.;:()]|$)/.test(s) || EN_IRREGULIERS.test(s);
const pVerbe = puces.length ? puces.filter(verbe).length / puces.length : 0;
const pChiffre = puces.length ? puces.filter((s) => /\d/.test(s)).length / puces.length : 0;
const profil = ((html.match(/<h2[^>]*>\s*Profil\s*<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "").replace(/<[^>]+>/g, " ").trim();
const motsProfil = profil.split(/\s+/).filter(Boolean).length;
const mots = t.split(" ").filter(Boolean).length;
const CLICHES = ["passionne par", "dynamique et motive", "excellent relationnel", "force de proposition", "esprit d equipe", "synergies", "levier de croissance", "environnement stimulant", "mettre a profit", "team player", "hard-working", "results-driven", "detail-oriented", "go-getter", "think outside the box"];
const nbCliches = CLICHES.filter((c) => t.includes(c)).length;
const qual = [];
let qScore = 0;
const qAdd = (pts, max, label, detail) => { qScore += pts; qual.push({ critère: label, points: `${pts}/${max}`, détail: detail }); };
qAdd(Math.round(pVerbe * 30), 30, "Lignes qui commencent par un verbe", `${Math.round(pVerbe * 100)} % de ${puces.length} lignes`);
qAdd(Math.round(Math.min(pChiffre / 0.6, 1) * 30), 30, "Lignes chiffrées", `${Math.round(pChiffre * 100)} % (objectif 60 %)`);
qAdd(motsProfil > 0 && motsProfil <= 60 ? 10 : 0, 10, "Accroche courte", motsProfil ? `${motsProfil} mots (max 60)` : "pas d'accroche « Profil »");
qAdd(mots >= 250 && mots <= 650 ? 15 : mots >= 150 ? 7 : 0, 15, "Longueur", `${mots} mots (250 à 650 pour 1 page)`);
qAdd(nbCliches === 0 ? 15 : Math.max(0, 15 - nbCliches * 5), 15, "Aucun cliché", nbCliches ? `${nbCliches} cliché(s)` : "");

const note = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
console.log("\nLISIBILITÉ ATS");
console.table(lignes);
console.log(`SCORE LISIBILITÉ : ${score}/100 (${note})`);
console.log("\nQUALITÉ DU CONTENU");
console.table(qual);
console.log(`SCORE QUALITÉ : ${qScore}/100`);
remarques.forEach((r) => console.log("  ! " + r));
critiques.forEach((c) => console.log("  ✗ CRITIQUE : " + c));
console.log("\nCes scores sont des indicateurs, pas la note d'un vrai ATS.");
if (critiques.length) process.exit(1);
console.log(score >= 90 && qScore >= 80 ? "OK : prêt pour les ATS." : "À améliorer : vise 90 en lisibilité et 80 en qualité.");
