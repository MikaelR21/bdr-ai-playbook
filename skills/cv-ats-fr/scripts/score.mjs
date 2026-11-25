// Score de couverture des mots-clés d'une offre dans un CV (diagnostic, ne modifie rien).
// Usage : node score.mjs <mots-cles.json> <cv.html|cv.md|cv.txt>
// mots-cles.json : {"indispensables": [["forme exacte", "variante"], ...], "bonus": [[...], ...]}
// Un mot-clé est couvert s'il apparaît au moins une fois (forme exacte, variante, pluriel ou synonyme).
import { readFileSync } from "node:fs";
import { norm, readText, countIn } from "./lib.mjs";

const [, , kwPath, cvPath] = process.argv;
if (!kwPath || !cvPath) {
  console.error("Usage : node score.mjs <mots-cles.json> <cv.html|cv.md|cv.txt>");
  process.exit(1);
}

// Synonymes courants, tous métiers (dans les deux sens). Ajoute ceux de ton métier.
const SYNONYMES = [
  ["cold calling", "appels a froid", "prospection telephonique", "phoning"],
  ["cold emailing", "cold email", "emailing a froid", "prospection par email", "prospection par e-mail"],
  ["crm", "logiciel crm"],
  ["linkedin sales navigator", "sales navigator"],
  ["prise de rendez-vous", "prise de rdv", "rendez-vous qualifies", "rdv qualifies", "booking de rendez-vous"],
  ["generation de leads", "lead generation", "lead gen"],
  ["business developer", "business development representative", "bdr"],
  ["sales development representative", "sdr"],
  ["intelligence artificielle", "ia", "ai"],
  ["social selling", "prospection sur linkedin"],
  ["account executive", "ae"],
  ["qualification des leads", "qualification de leads", "lead qualification"],
  ["gestion de projet", "pilotage de projet", "project management"],
  ["service client", "relation client", "customer service", "support client"],
  ["ressources humaines", "rh", "hr", "human resources"],
  ["comptabilite", "accounting"],
  ["controle de gestion", "controleur de gestion", "financial controlling"],
  ["tableaux de bord", "tableau de bord", "dashboard", "dashboards", "reporting"],
  ["methodes agiles", "agile", "scrum"],
  ["anglais courant", "anglais professionnel", "fluent english"],
];

const variantes = (term) => {
  const t = norm(term);
  const out = new Set([t]);
  const words = t.split(" ");
  const last = words[words.length - 1];
  if (last.length >= 3 && !last.endsWith("s")) out.add([...words.slice(0, -1), last + "s"].join(" "));
  if (last.length > 3 && last.endsWith("s")) out.add([...words.slice(0, -1), last.slice(0, -1)].join(" "));
  for (const g of SYNONYMES) if (g.includes(t)) g.forEach((x) => out.add(x));
  return [...out];
};

const text = " " + norm(readText(cvPath)) + " ";
// Retire l'éventuel BOM (fichiers écrits par PowerShell 5.1 avec -Encoding utf8).
const kw = JSON.parse(readFileSync(kwPath, "utf8").replace(/^﻿/, ""));
const total = (kw.indispensables || []).length + (kw.bonus || []).length;
if (total === 0) {
  console.error("Aucun mot-clé dans le fichier : rien à mesurer.");
  process.exit(1);
}

const report = (label, list = []) => {
  let found = 0;
  const rows = list.map((entry) => {
    const forms = Array.isArray(entry) ? entry : [entry];
    const exact = countIn(text, forms[0]);
    const all = new Set(forms.flatMap(variantes));
    const tot = [...all].reduce((a, v) => a + countIn(text, v), 0);
    if (tot > 0) found++;
    let statut = tot === 0 ? "ABSENT" : exact > 0 ? "OK" : "SYNONYME SEUL (mets la forme exacte si c'est vrai)";
    if (tot > 3) statut += " · ATTENTION bourrage (" + tot + ")";
    return { "mot-clé": forms[0], "forme exacte": exact, total: tot, statut };
  });
  const pct = list.length ? Math.round((found / list.length) * 100) : 0;
  console.log(`\n${label} : ${found}/${list.length} couverts (${pct} %)`);
  if (rows.length) console.table(rows);
  return pct;
};

const pInd = report("Indispensables", kw.indispensables);
const pBon = report("Bonus", kw.bonus);
console.log(`\nMots dans le CV : ${text.split(" ").filter(Boolean).length}`);
console.log(`SCORE indispensables ${pInd} % · bonus ${pBon} %`);
if (pInd < 80) console.log("Objectif : au moins 80 % des indispensables, sans rien inventer.");
console.log("ABSENT veut dire que ce contrôle ne l'a pas trouvé : la compétence peut être décrite autrement.");
