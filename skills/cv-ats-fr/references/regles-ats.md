# Règles ATS et rédaction (CV en français)

## Mise en forme lisible par les ATS
- **Une seule colonne.** Pas de grille, de colonnes CSS ni de tableau de mise en page : l'ordre de lecture se mélange.
- **Pas d'image, d'icône, de jauge ou d'étoile** pour porter une information. Écris « Anglais : B2 (TOEIC 850) ».
- **Coordonnées en texte simple dans le corps de la page**, en haut, jamais dans un en-tête ou pied de page. L'e-mail doit être écrit en clair.
- **Titres de sections standards** : « Profil », « Compétences », « Expériences professionnelles », « Formation », « Langues », « Centres d'intérêt ». Pas de titres créatifs. Une section vide est supprimée avec son titre.
- **Compétences en texte**, séparées par des virgules, sous « Compétences ». Pas d'étiquettes graphiques : l'espace entre deux étiquettes n'est pas un séparateur pour un ATS.
- **Police système** (Arial, Helvetica, Calibri), 10 à 11 pt pour le corps.
- **Pas de lettres espacées** dans les titres (« E X P É R I E N C E S ») : l'ATS lit des lettres isolées et ne reconnaît plus la section.
- **Niveaux en mots** : « Anglais : courant (C1) », « HubSpot : utilisation quotidienne », jamais 4/5 ou une barre.
- **Une ou deux pages** se lisent pareil pour un ATS ; la limite d'une page vaut pour le recruteur humain.
- **Ordre des expériences** : de la plus récente à la plus ancienne.
- **Format** : PDF avec couche texte, exporté depuis HTML ou Word. Word seulement si l'offre le demande.
- **Nom du fichier** : `CV_Prenom_Nom_Poste.pdf`.
- **Liens cliquables** : e-mail (`mailto:`), LinkedIn et GitHub en `<a href>`, avec l'adresse complète comme texte visible. L'ATS lit le texte, le recruteur clique.

## Design autorisé (recherche du 23/11/2026)
Les sources ne s'accordent que sur peu de points, et la plupart viennent d'éditeurs qui vendent des modèles. Workday est le plus strict ; Greenhouse et Lever tolèrent mieux la mise en forme, mais les preuves sont minces. On reste donc sur ce qui passe partout :
- **Permis** : une couleur d'accent pour le nom, le titre, les titres de section et les dates ; filets, bordures et fond clair derrière un titre de section ; gras et italique. Le CV doit rester lisible en noir et blanc : la couleur ne porte jamais d'information.
- **Interdit** : deux colonnes, dates alignées à droite avec `flex`, `grid`, `float` ou un tableau (verif-ats retire 20 points de lisibilité). Écris les dates dans la ligne du poste : « Intitulé · Entreprise · 09/2026 - aujourd'hui ».
- **Interdit** : en-tête et pied de page de Word ou du PDF, icônes devant les coordonnées, jauges, logos, polices fantaisie.
- **Contrôle** : après l'export, ouvre `texte-extrait.txt`. Il doit se lire dans l'ordre, de haut en bas, sans morceaux mélangés.

## Dates
- Début et fin explicites, au même format partout, séparés par un **tiret simple** « - » : « 09/2025 - aujourd'hui ». Certains ATS lisent mal les tirets longs.
- Pas d'année seule pour un poste court : « 06/2024 - 08/2024 », pas « 2024 ».
- **Diplôme en cours** : écris-le clairement, sinon il passe pour obtenu. Exemple : « Bachelor Business Developer, en cours, obtention prévue en 06/2027 ».
- Ne raccourcis jamais une période d'emploi.

## Mots-clés
- Reprends la **forme exacte** de l'offre, sigles et termes anglais inclus (« SDR », « Scrum », « SIRH », « Power BI », « customer success »). Pour un sigle, écris une fois la forme longue : « Système d'information RH (SIRH) ».
- **Placement** : les 5 plus importants dans l'accroche, au moins un dans la première ligne de chaque expérience, tous ceux qui sont couverts dans « Compétences ».
- **Jamais de bourrage** : 3 occurrences maximum par mot-clé, pas de texte blanc ou minuscule, pas de liste de mots-clés sans contexte.
- Un mot-clé « écart » n'entre jamais dans le CV, même dans les compétences.

## Budget de place (1 page)
| Bloc | Budget |
|------|--------|
| Accroche (« Profil ») | 3 lignes |
| Compétences | 4 à 6 lignes, une catégorie par ligne |
| Expérience la plus récente ou la plus pertinente | 4 à 5 lignes |
| Expérience précédente | 2 à 3 lignes |
| Expériences plus anciennes | 1 à 2 lignes chacune |
| Formation | 2 à 3 entrées |
| Langues et centres d'intérêt | 1 ligne chacun, seulement s'ils servent l'offre |

Trop long ? Note chaque ligne sur sa pertinence pour l'offre et son unicité, et coupe d'abord la plus faible, quelle que soit sa section.

## Rédaction des lignes d'expérience
- **Verbe d'action au début**, au même temps partout : Conçu, Piloté, Développé, Analysé, Géré, Réduit, Augmenté, Formé, Négocié, Automatisé, Livré, Résolu, Prospecté, Animé. Varie les verbes. En anglais : Led, Built, Designed, Managed, Reduced, Increased, Delivered.
- **Formule** : verbe + quoi + outil ou cible + résultat chiffré. Exemples dans plusieurs métiers :
  - Vente. Faible : « Prospection de clients par téléphone. » Fort : « Prospecté 60 PME par jour par téléphone et LinkedIn, 12 rendez-vous qualifiés par mois. »
  - Comptabilité. Faible : « Clôtures mensuelles. » Fort : « Réduit la clôture mensuelle de 8 à 5 jours en automatisant les rapprochements bancaires sous Excel. »
  - Développement. Faible : « Développement d'API. » Fort : « Développé 12 API REST en Node.js utilisées par 40 000 clients, temps de réponse divisé par 2. »
  - Support. Faible : « Réponse aux clients. » Fort : « Traité 45 tickets par jour sous Zendesk avec 94 % de satisfaction client. »
- Choisis le type de résultat que l'offre valorise : volume (dossiers, clients, tickets, appels), délai (temps gagné, délais tenus), argent (chiffre d'affaires, coûts, budget géré), qualité (satisfaction, taux d'erreur, conformité), portée (nombre d'utilisateurs, d'équipes, de sites).
- **Montrer, pas affirmer** : pas de « excellent relationnel » sans preuve.
- Mets en avant l'IA quand elle est réelle et utile au poste : « Automatisé la veille de comptes avec Claude (tâches planifiées), 1 h gagnée par jour ».
- Pas de tirets longs (—) dans le texte.

## Expressions interdites (clichés et tics d'IA)
« passionné par », « dynamique et motivé », « force de proposition » sans exemple, « excellent relationnel », « esprit d'équipe » sans exemple, « mettre à profit mes compétences », « être opérationnel rapidement », « je pense être le candidat idéal », « synergies », « levier de croissance », « environnement stimulant », « véritable », « au cœur de », « n'hésitez pas ».
Remplace-les par un fait : « J'apporte X, prouvé par Y. »

## Spécificités françaises
- **Alternance** : école, diplôme préparé (en cours, date prévue), rythme (« 3 jours entreprise / 2 jours école »), date de disponibilité. Les recruteurs filtrent dessus.
- **Mobilité et permis** : seulement si l'offre en parle.
- **Âge, situation familiale, nationalité** : jamais.
- **Photo** : jamais obligatoire. L'ATS l'ignore, et verif-ats retire 10 points (« Aucune image »), sans effet sur ce qui est lu. Ne la mets jamais sur un CV en anglais : les entreprises anglo-saxonnes l'écartent à cause de leurs règles contre la discrimination. Sur un CV en français, mets-la seulement si l'utilisateur l'a demandé (le chemin de la photo est noté dans le profil maître).
- **Langue du CV** : français. Si l'offre est en anglais ou demande un CV en anglais, demande à l'utilisateur avant de changer.

## Vocabulaire du métier visé
Avant de rédiger, repère le vocabulaire standard du métier de l'offre : c'est celui que le recruteur tape dans son ATS. Quelques repères :
- **Vente / développement commercial** : prospection, cold calling, génération de leads, qualification (BANT, MEDDIC), pipeline, CRM (HubSpot, Salesforce), taux de conversion, rendez-vous qualifiés.
- **Marketing** : SEO, SEA, acquisition, CRM, emailing, taux de conversion, ROI, Google Analytics, content marketing, social media.
- **Développement / tech** : langages et frameworks, API, cloud (AWS, Azure), CI/CD, tests, Git, méthodes agiles (Scrum).
- **Data** : SQL, Python, Power BI, Tableau, modélisation, ETL, tableaux de bord, KPI.
- **RH** : recrutement, SIRH, paie, onboarding, GPEC, droit du travail, marque employeur.
- **Finance / comptabilité** : clôture, consolidation, contrôle de gestion, budget, reporting, normes IFRS, ERP (SAP).
- **Support / service client** : tickets, SLA, satisfaction client (CSAT, NPS), Zendesk, escalade, base de connaissances.
- **Gestion de projet** : planning, budget, gestion des risques, parties prenantes, Agile, Jira, PMP.
N'utilise un terme que si le profil maître le justifie.
