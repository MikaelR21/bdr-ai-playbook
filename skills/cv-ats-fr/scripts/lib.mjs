// Fonctions partagées par les scripts du skill cv-ats-fr.
import { readFileSync } from "node:fs";

// Minuscules, sans accents, apostrophes et tirets unifiés, espaces compactés.
export const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’‘']/g, " ")
    .replace(/[‐-―−]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();

const decode = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

// Texte visible d'un fichier HTML (ou texte brut pour .md/.txt).
export const readText = (path) => {
  let raw = readFileSync(path, "utf8");
  if (/\.html?$/i.test(path)) {
    raw = raw
      .replace(/<head[\s\S]*?<\/head>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " ");
    raw = decode(raw);
  }
  return raw;
};

export const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Nombre d'occurrences d'un terme avec des frontières de mot (java ne trouve pas javascript).
export const countIn = (normText, term) => {
  const t = norm(term);
  if (!t) return 0;
  const re = new RegExp(`(?<![a-z0-9])${esc(t)}(?![a-z0-9])`, "g");
  return (normText.match(re) || []).length;
};
