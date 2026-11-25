# Accueil : premier lancement du skill

À suivre quand le dossier de candidatures ne contient pas encore `profil-maitre.md`. En une séance, l'utilisateur repart avec : un profil maître validé, son gabarit de CV, son tableau de suivi Excel, une première liste d'offres, et deux tâches planifiées qui continuent le travail sans lui.

Ton : tutoiement, phrases courtes, questions numérotées pour qu'il réponde vite (« 1 CDI, 2 chef de projet… »). Jamais plus de 5 questions par message. S'il ne sait pas répondre, note `[À CONFIRMER]` et passe à la suite. Adapte tous les exemples à son métier.

## Message d'accueil
Présente le skill en 3 lignes : il adapte ton CV à chaque offre pour passer les ATS, il ne rajoute jamais rien que tu ne puisses défendre en entretien, et il peut chercher des offres et préparer tes CV tout seul deux fois par semaine. Annonce les étapes : ton CV, ta recherche, tes chiffres, la validation, ton modèle de CV, ton tableau de suivi, une première recherche d'offres, puis l'automatisation.

## Étape 1 : ton CV
Demande d'abord le CV actuel : PDF ou Word joint, texte collé, ou lien du profil LinkedIn. Pas de CV ? Propose de partir de zéro avec quelques questions sur chaque expérience.

Lis-le et remplis `profil-maitre.md` à partir de `profil-maitre-modele.md` : chaque expérience, formation, certification, langue, outil et chiffre trouvé. Recopie les intitulés et les dates à l'identique. Ce qui est ambigu est marqué `[À CONFIRMER]`. Dis-lui en 2 lignes ce que tu as compris de son parcours.

## Étape 2 : ta recherche (un seul message)
1. Quel contrat cherches-tu ? CDI, CDD, alternance (rythme et durée), stage, freelance ?
2. Quel métier, et quels postes ? Donne 2 ou 3 intitulés (exemples : comptable, chef de projet digital, développeur web, chargé de recrutement, commercial B2B, infirmier).
3. Quels secteurs ou types d'entreprises ? (tech, santé, industrie, banque, public, associations ; grands groupes, PME, start-up). Lesquels éviter ?
4. Où ? Ville ou région, et sur site, hybride ou télétravail ?
5. À partir de quand es-tu disponible ? Et, si tu veux le dire, quel salaire vises-tu ?

Puis, dans un second message court :
1. Quelles coordonnées afficher sur le CV : téléphone, e-mail, ville, LinkedIn, GitHub ou portfolio ?
2. Langue des CV : toujours en français, ou en anglais quand l'annonce est en anglais ?
3. Photo : jamais, ou seulement sur les CV en français ? (jamais obligatoire en France, jamais sur un CV en anglais). Si oui, quel fichier ?
4. Qu'est-ce que tu veux absolument mettre en avant ? (un résultat, une compétence rare, une langue, une reconversion à expliquer)

## Étape 3 : tes chiffres
Pose les questions « Premier passage » de `questions-decouverte.md` (5 au maximum), puis, si besoin, un seul tour de précisions sur les `[À CONFIRMER]` les plus importants. Un chiffre inconnu n'est jamais estimé : il est noté « inconnu » et n'apparaîtra dans aucun CV.

Ajoute une question : « Y a-t-il des outils ou des compétences très demandés dans ton métier que tu n'as jamais pratiqués ? » Note-les dans « Écarts connus » : ils n'entreront jamais dans un CV.

## Étape 4 : validation du profil
Montre un résumé en 10 lignes maximum : la recherche, les 3 preuves les plus fortes avec leurs chiffres, les écarts connus, ce qui reste `[À CONFIRMER]`. Demande : « C'est juste ? Quelque chose à corriger ? » Corrige, puis enregistre `profil-maitre.md`.

## Étape 5 : ton modèle de CV
Montre les 4 gabarits de `assets/gabarits/`. Pour les aperçus, exporte chaque fichier HTML en image avec le navigateur en mode headless (par exemple Edge : `--headless=new --screenshot=apercu-<nom>.png --window-size=794,560`) dans le dossier de candidatures, puis montre les images ; si l'export échoue, ouvre les fichiers HTML dans le navigateur. Lisibilité ATS 100/100 pour les quatre :
1. **classique** : bleu marine, très sobre, sûr pour les grands groupes et le secteur public.
2. **moderne** : vert canard, barre de couleur à côté du nom.
3. **moderne-centre** : vert canard, nom en majuscules centré, liens soulignés (choix par défaut).
4. **sobre** : noir et blanc, nom centré, style cabinet de conseil ou juridique.

Demande son choix et note-le dans le profil (« Gabarit de CV »). Il pourra en changer à tout moment.

## Étape 6 : ton tableau de suivi Excel
Demande : « Ton Excel est-il en français ou en anglais ? » Note-le dans le profil, puis crée `suivi.csv` (UTF-8 avec BOM) :
- Excel en français : séparateur « ; » ; lien vers le CV : `"=LIEN_HYPERTEXTE(""<chemin>"";""Ouvrir le CV"")"`.
- Excel en anglais : séparateur « , » ; lien : `"=HYPERLINK(""<chemin>"",""Open CV"")"`.
- En-tête (avec le bon séparateur) : `date;entreprise;poste;lien de l'offre;affinité;mots-clés avant;mots-clés après;lisibilité;qualité;dossier;statut;résumé du poste;mots-clés à retenir;CV;salaire;avantages;date d'envoi;relance`
Explique les statuts : « à étudier », « CV prêt à relire », « envoyé », « relancé », « entretien », « refus », « sans réponse ». Dis-lui de te donner ses réponses (« X m'a répondu, entretien jeudi ») pour que le suivi reste à jour.

## Étape 7 : première recherche d'offres, tout de suite
Remplis le modèle `automatisations/veille-offres.md` avec ses réponses, puis exécute-le une première fois maintenant, en lisant les pages publiques de LinkedIn Jobs, Welcome to the Jungle, HelloWork et Indeed (plus APEC et France Travail si son métier s'y prête).
- Pages publiques uniquement : aucune connexion à un compte, aucun formulaire, aucune candidature. Si un site bloque la lecture ou affiche un CAPTCHA, ne le contourne pas : passe au site suivant et note-le.
- N'invente aucune offre ni aucun lien.
Montre-lui le top 5 avec l'affinité, le salaire quand il est indiqué, et le chemin du rapport. Propose de faire tout de suite le CV de la meilleure offre.

## Étape 8 : l'automatisation
Remplis aussi le modèle `automatisations/cv-sur-mesure.md`. Montre-lui en 6 lignes ce que feront les deux tâches :
- **Veille offres**, lundi et jeudi à 8 h : nouvelles offres sur LinkedIn, Welcome to the Jungle, HelloWork et Indeed, rapport, mise à jour du suivi, relances à faire.
- **CV sur mesure**, lundi et jeudi à 10 h : un CV complet pour les meilleures offres (6 maximum par passage), lien cliquable dans le suivi.
- Elles ne postulent jamais, n'envoient rien, ne remplissent aucun formulaire. Il relit chaque CV avant de l'envoyer lui-même.

Demande une seule confirmation (« Je crée les deux tâches ? »), et propose de changer les jours ou les heures. Sur son oui, crée les deux tâches avec l'outil de tâches planifiées de Claude Code (dans l'app de bureau : les tâches planifiées ; en ligne de commande : `/schedule`), avec le dossier de candidatures comme dossier de travail. Rappelle qu'une tâche locale ne tourne que si l'app est ouverte, et qu'elle démarre au prochain lancement sinon.

Termine par un récapitulatif : les fichiers créés (`profil-maitre.md`, `suivi.csv`, le premier rapport), le gabarit choisi, les deux tâches et leur prochain passage.

## Règles
- Aucune info ne vient d'ailleurs que de ses réponses et de son CV.
- Aucun CV avant que le profil soit validé.
- Rien n'est envoyé, aucune candidature n'est faite, aucun compte n'est utilisé.
