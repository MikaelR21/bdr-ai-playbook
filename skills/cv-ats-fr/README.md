# cv-ats-fr : un CV sur mesure pour chaque offre, sans rien inventer

Skill Claude Code pour **tous les chercheurs d'emploi** : il adapte ton CV à **une** offre précise pour passer le tri des ATS, puis convaincre un recruteur. Vente, tech, marketing, finance, RH, support, santé, industrie : il marche pour tous les métiers, en CDI, stage ou alternance, en français ou en anglais.

Je l'ai construit pour ma propre recherche d'emploi, puis je l'ai rendu utilisable par n'importe qui.

## Ce qu'il fait

- Il lit l'offre, en tire l'intitulé exact, les exigences indispensables et bonus, et 12 à 20 mots-clés sous leur forme exacte.
- Il compare l'offre à ton profil et calcule l'**affinité** : Excellente, Bonne, Moyenne ou Faible.
- Il mesure ton CV actuel **avant** de rédiger, puis le CV adapté **après**.
- Il réécrit le CV avec les mots de l'offre, **sans ajouter un seul fait** qui n'est pas dans ton profil.
- Il exporte un PDF d'une page, avec des liens cliquables, et vérifie ce que l'ATS lit vraiment.

## Installation

1. Copie le dossier `cv-ats-fr` dans `~/.claude/skills/` (Windows : `%USERPROFILE%\.claude\skills\`).
2. Il faut **Node.js** (pour les scripts de score) et **Microsoft Edge** (pour l'export PDF, chemin Windows par défaut dans `SKILL.md`).
3. Crée un dossier pour tes candidatures et ouvre Claude Code dedans.
4. Écris : « Lance le skill cv-ats-fr. »

## Premier lancement : le skill te pose les questions

Au premier lancement, quand ton dossier n'a pas encore de profil maître, le skill ne fait aucun CV. Il déroule un accueil complet ([`references/accueil.md`](references/accueil.md)) et tu repars avec tout ton système de recherche en place :

| # | Étape | Ce qui se passe |
|---|-------|-----------------|
| 1 | Ton CV | Tu donnes ton CV (PDF, Word, texte ou LinkedIn). Le skill le lit et prépare ton profil maître. |
| 2 | Ta recherche | Contrat, métier et postes visés, secteurs, lieu et télétravail, disponibilité, salaire visé si tu veux ; coordonnées, langue des CV, photo ou non. |
| 3 | Tes chiffres | Ce que tu fais en une semaine type, tes résultats chiffrés, tes outils, ta plus belle réussite, ce que tu n'as jamais pratiqué. |
| 4 | Validation | Un résumé de ton profil à corriger, puis `profil-maitre.md` est enregistré. |
| 5 | Ton modèle de CV | Tu choisis parmi 4 gabarits ATS (voir plus bas). |
| 6 | Ton suivi Excel | Création de `suivi.csv`, adapté à ton Excel en français ou en anglais, avec liens cliquables vers tes CV. |
| 7 | Première recherche | Le skill cherche tout de suite des offres sur LinkedIn, Welcome to the Jungle, HelloWork et Indeed, et te montre le top 5. |
| 8 | Automatisation | Après ta confirmation, il crée deux tâches planifiées : veille offres et CV sur mesure, le lundi et le jeudi. |

5 questions maximum par message, numérotées, avec des exemples adaptés à ton métier. Ce que tu ne sais pas est noté « inconnu » et n'apparaîtra dans aucun CV.

Ensuite, pour une offre précise : « Adapte mon CV à cette offre : [lien ou texte de l'offre]. »

## 4 gabarits de CV au choix

Tous en une colonne, lisibilité ATS 100/100 avec le contrôle du skill.

| Gabarit | Style | Pour qui |
|---------|-------|----------|
| [classique](assets/gabarits/classique.html) | Bleu marine, très sobre | Grands groupes, secteur public |
| [moderne](assets/gabarits/moderne.html) | Vert canard, barre de couleur à côté du nom | Tech, start-up |
| [moderne-centre](assets/gabarits/moderne-centre.html) (par défaut) | Vert canard, nom centré en majuscules, liens soulignés | Polyvalent |
| [sobre](assets/gabarits/sobre.html) | Noir et blanc, nom centré | Conseil, juridique, finance |

Pendant l'accueil, le skill te montre l'aperçu de chacun avant que tu choisisses.

## La règle absolue : ne jamais inventer

Tout part du fichier `profil-maitre.md` : ton parcours complet, avec tes chiffres. Le CV n'en est qu'une sélection.

- Reformuler avec le vocabulaire de l'offre : oui, si c'est toujours vrai.
- Ajouter un outil, gonfler un chiffre, embellir un intitulé : jamais.
- Une exigence que tu n'as pas reste un **écart**. Elle n'entre pas dans le CV ; le skill te propose une passerelle honnête pour l'entretien.

Un script bloquant (`verif-faits.mjs`) compare chaque chiffre et chaque intitulé du CV au profil maître.

## Les étapes

| # | Étape | Ce qui en sort |
|---|-------|----------------|
| 0 | Accueil au premier lancement | `profil-maitre.md`, `suivi.csv` |
| 1 | Charger le profil maître | questions sur ce qui reste à confirmer |
| 2 | Récupérer l'offre | `offre.md` |
| 3 | Analyser l'offre : intitulé, type de poste, exigences, mots-clés | `analyse.md` |
| 4 | Registre des exigences et des preuves, affinité | tableau exigence / preuve / statut |
| 5 | Score de mots-clés **avant** | `mots-cles.json`, score |
| 6 | Rédiger le CV adapté à partir du gabarit | `cv.html` |
| 7 | Contrôles : faits (bloquant), mots-clés, relecture par un « recruteur » (sous-agent) | alertes corrigées |
| 8 | Export PDF et contrôle ATS | `CV_Prenom_Nom_Poste.pdf`, `texte-extrait.txt` |
| 9 | Suivi des candidatures | une ligne dans `suivi.csv` (Excel), avec un lien cliquable vers le CV |
| 10 | Compte rendu : 3 scores séparés, écarts, passerelles | résumé |

## Trois scores, jamais fusionnés

- **Adéquation** : part des mots-clés indispensables de l'offre présents dans le CV (objectif : 80 % ou plus).
- **Lisibilité ATS** sur 100 : une colonne, titres standards, e-mail en clair, pas d'image, police système, pas de texte caché.
- **Qualité** sur 100 : lignes qui commencent par un verbe d'action (en français ou en anglais), lignes chiffrées, accroche courte, pas de clichés.

Ce sont des indicateurs, pas la note d'un vrai ATS.

## Le design : ce qui passe partout

Le gabarit (`assets/cv-template.html`) suit ce que les sources sur les ATS ont en commun en 2026 :

- une seule colonne, des titres de section standards, Arial ;
- une couleur d'accent, mais un CV lisible en noir et blanc ;
- les dates **dans la ligne du poste**, jamais alignées à droite avec `flex` ou un tableau (en test, ça faisait tomber la lisibilité de 100 à 80) ;
- e-mail, LinkedIn et GitHub ou portfolio en liens cliquables, avec l'adresse écrite en clair ;
- pas d'en-tête ni de pied de page, pas d'icônes, pas de jauges, pas de photo sur un CV en anglais.

Les détails sont dans [`references/regles-ats.md`](references/regles-ats.md), avec le vocabulaire de base de plusieurs métiers (vente, marketing, tech, data, RH, finance, support, gestion de projet).

## Les automatisations

À la fin de l'accueil, le skill crée deux tâches planifiées dans Claude Code, remplies avec tes réponses :

| Quand | Tâche | Rôle |
|-------|-------|------|
| Lundi et jeudi, 8 h | [Veille offres et suivi](automatisations/veille-offres.md) | Cherche les nouvelles offres sur LinkedIn, Welcome to the Jungle, HelloWork et Indeed (pages publiques), note l'affinité, relève salaire et avantages, met à jour ton suivi : relances à faire après 7 jours, offres fermées, ce qui répond |
| Lundi et jeudi, 10 h | [CV sur mesure](automatisations/cv-sur-mesure.md) | Prend les meilleures offres de la veille et produit un CV complet pour chacune, avec ton gabarit et un lien cliquable dans le suivi |

Il te montre ce qu'elles feront et te demande une seule confirmation avant de les créer. Tu peux changer les jours et les heures.

Une tâche locale ne tourne que si l'app Claude est ouverte ; sinon, elle démarre au prochain lancement.

Garde-fous : les tâches ne postulent jamais, n'envoient rien (les relances sont préparées, pas envoyées), ne remplissent aucun formulaire, ne se connectent à aucun compte et ne contournent aucun blocage de site. Tu relis chaque CV avant de l'envoyer toi-même.

## Contenu du dossier

```
cv-ats-fr/
├── SKILL.md                      les instructions du skill
├── assets/
│   ├── cv-template.html          le gabarit par défaut
│   └── gabarits/                 les 4 gabarits au choix
├── references/
│   ├── accueil.md                le premier lancement, de ton CV jusqu'aux tâches planifiées
│   ├── regles-ats.md             mise en forme, rédaction, design, vocabulaire par métier
│   ├── questions-decouverte.md   les questions pour faire ressortir l'expérience non écrite
│   └── profil-maitre-modele.md   la structure du profil maître
├── scripts/
│   ├── score.mjs                 couverture des mots-clés
│   ├── verif-faits.mjs           contrôle des faits (bloquant)
│   └── verif-ats.mjs             lisibilité ATS, qualité, champs reconnus, texte extrait
└── automatisations/              les modèles de tâches planifiées
```

## Limites

- Pensé d'abord pour le marché français (alternance, usages de CV) ; l'anglais est géré par traduction fidèle de ton profil.
- Les scores mesurent la structure et les mots-clés, pas la décision d'un recruteur.
- Les pages d'offres bloquées (LinkedIn notamment) sont remplacées par une autre source publique, ou ignorées.
- Export PDF prévu pour Windows avec Edge ; sur Mac ou Linux, adapte la commande d'export de `SKILL.md` (Chrome ou Chromium en mode headless).
