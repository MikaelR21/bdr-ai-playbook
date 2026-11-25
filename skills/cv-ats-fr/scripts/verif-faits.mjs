// Contrôle des faits : tout chiffre et tout intitulé du CV doit exister dans le profil maître.
// Usage : node verif-faits.mjs <cv.html> <profil-maitre.md>
// Code de sortie 1 s'il reste une alerte : le CV ne doit pas partir tant qu'elle n'est pas résolue.
import { readFileSync } from "node:fs";
import { norm, readText, countIn } from "./lib.mjs";

const [, , cvPath, profilPath] = process.argv;
if (!cvPath || !profilPath) {
  console.error("Usage : node verif-faits.mjs <cv.html> <profil-maitre.md>");
  process.exit(1);
}

const cvHtml = readFileSync(cvPath, "utf8");
const cv = readText(cvPath);
const profil = " " + norm(readFileSync(profilPath, "utf8")) + " ";
const profilDigits = profil.replace(/[^0-9]/g, " ");
const alertes = [];
const avertissements = [];

// 1. Chiffres : chaque nombre du CV doit apparaître dans le profil.
// Les milliers séparés par une espace (« 120 000 ») comptent comme un seul nombre.
const nombres = new Set();
for (const m of cv.matchAll(/\d{1,3}(?:[   ]\d{3})+(?![0-9])|\d+(?:[.,]\d+)?/g)) nombres.add(m[0].replace(/[  ]/g, " "));
for (const n of nombres) {
  if (n.includes(" ")) {
    const compact = n.replace(/ /g, "");
    const ok = profil.includes(n) || new RegExp(`(?<![0-9])${compact}(?![0-9])`).test(profil);
    if (!ok) alertes.push(`Chiffre « ${n} » absent du profil maître : ${extrait(cv, n.split(" ")[0])}`);
    continue;
  }
  const variants = [n, n.replace(",", "."), n.replace(".", ",")];
  const ok = variants.some((v) => new RegExp(`(?<![0-9])${v.replace(".", "\\.")}(?![0-9])`).test(profil));
  if (ok) continue;
  const okDigits = new RegExp(`(?<![0-9])${n.replace(/[.,]/g, " ")}(?![0-9])`).test(profilDigits);
  (okDigits ? avertissements : alertes).push(`Chiffre « ${n} » ${okDigits ? "trouvé sous une autre forme, vérifie" : "absent du profil maître"} : ${extrait(cv, n)}`);
}

// 2. Intitulés et entreprises des expériences et formations (classe poste-tete) : à l'identique.
for (const m of cvHtml.matchAll(/class="poste-tete"[^>]*>([\s\S]*?)<\/p>/g)) {
  const brut = m[1].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&");
  for (const part of brut.split(/\s+[·|]\s+/)) {
    const p = part.trim();
    if (p && countIn(profil, p) === 0) alertes.push(`Intitulé ou entreprise « ${p} » absent tel quel du profil maître`);
  }
}

// 3. Expressions interdites et tics d'écriture.
const INTERDITES = [
  "passionne par", "passionnee par", "dynamique et motive", "dynamique et motivee", "excellent relationnel",
  "mettre a profit mes competences", "operationnel rapidement", "operationnelle rapidement", "candidat ideal",
  "candidate ideale", "synergies", "levier de croissance", "environnement stimulant", "n hesitez pas",
];
const cvNorm = " " + norm(cv) + " ";
for (const e of INTERDITES) if (countIn(cvNorm, e) > 0) avertissements.push(`Expression à remplacer par un fait : « ${e} »`);
if (/—/.test(cv)) avertissements.push("Tiret long (—) trouvé : remplace-le par une virgule ou un point.");

function extrait(t, n) {
  const i = t.indexOf(n);
  return "… " + t.slice(Math.max(0, i - 40), i + n.length + 40).replace(/\s+/g, " ").trim() + " …";
}

console.log(`\nCONTRÔLE DES FAITS : ${alertes.length} alerte(s), ${avertissements.length} avertissement(s)`);
alertes.forEach((a) => console.log("  ✗ " + a));
avertissements.forEach((a) => console.log("  ! " + a));
if (alertes.length) {
  console.log("\nBLOQUANT : corrige ou supprime chaque alerte. Si l'info est vraie, fais-la confirmer et ajoute-la au profil maître.");
  process.exit(1);
}
console.log("\nOK : aucun chiffre ni intitulé inventé détecté.");
