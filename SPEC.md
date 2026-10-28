# Cahier des charges — V1

## Objectif

Présenter Charles-Antoine Patarroni, ses expertises et les formations validées, puis permettre un premier contact. Direction éditoriale minimaliste autour du mouvement : comprendre le changement, mobiliser et avancer.

## Périmètre retenu

La V1 est publiée sur GitHub Pages, dans le dépôt public Youplala/changeandprojects, à la demande explicite de l’utilisateur du 28 octobre 2026. Elle reste disponible localement sur le port 4321. Les V2 et V3 ne sont pas publiées. Aucune intégration Sites. Les formations restent en brouillon et l’indexation reste désactivée jusqu’à validation éditoriale.

| Route | Contenu |
| --- | --- |
| `/` | Message, approche en trois expertises, Charles-Antoine, contact |
| `/formations/` | Catalogue simple ; état d’attente tant qu’aucune offre n’est validée |
| `/formations/[slug]/` | Fiches statiques des seules formations complètes portant `published: true` |
| `/mentions-legales/` | Informations de société sourcées et éléments à confirmer |
| `/404.html` | Retour vers l’accueil |

## Architecture

Astro en génération statique, TypeScript pour les données et CSS responsive. Données centralisées dans `src/data/site.ts`, composants communs pour la navigation, le pied de page, le contact et l’emblème. Aucun CMS ou backend. Polices Manrope et Newsreader incluses dans le projet via Fontsource.

## Direction artistique

Ivoire `#f5f3eb`, rouge profond `#972d2b`, anthracite `#292b27`, bronze. Grands titres sans sérif ponctués d’italiques éditoriales. À la demande explicite de l’utilisateur, la photographie de L’Homme qui marche I de Giacometti remplace la silhouette géométrique provisoire. Elle est détourée avec une véritable couche alpha et intégrée sans encadrement sur le fond ivoire. Aucun modèle 3D n’a été créé.

Le bloc « Votre interlocuteur » associe le portrait réel de Charles-Antoine, issu de son profil LinkedIn, à sa biographie. La photographie carrée est stockée localement et chargée à la demande ; les 30 ans d’expérience figurent en légende. Sur mobile, le portrait précède le texte.

## Fonctionnement et accessibilité

Navigation vers les sections de l’accueil et le catalogue. Menu mobile natif accessible avec état `aria-expanded`, fermeture sur Échap et après sélection. Liens de contact LinkedIn explicites, ouverts dans un nouvel onglet. Lien d’évitement vers le contenu, hiérarchie de titres, focus visible, respect de la préférence de réduction du mouvement. Pas d’inscription ni de formulaire.

L’accueil propose un lien direct vers les formations en complément du parcours vers l’approche. La statue, son annotation et sa légende sont disposées dans le flux pour éviter les chevauchements à chaque taille d’écran. Une apparition discrète accompagne l’entrée de la page et la découverte des sections ; elle est désactivée si l’utilisateur préfère réduire les animations. Les contenus restent disponibles sans JavaScript et à l’impression.

La scène conserve la photographie détourée et une ombre discrète, sans cercle ni repère de sol. Son centrage est assuré par une grille fixe ; seule la photographie s’incline légèrement au survol, avec une interpolation sans dépassement. L’apparition agit uniquement sur l’opacité et aucun déplacement au défilement ne se cumule à l’inclinaison. Il s’agit d’un effet de perspective appliqué à une photo, pas d’un modèle 3D. L’effet est désactivé sur écran tactile et avec la préférence de réduction du mouvement. Les textes suivent une échelle commune : corps de 17 px (16 px sur mobile), liens et boutons de 15 px, annotations de 13 px. Les polices et couleurs restent inchangées.

## Données commerciales

Aucune offre validée n’a été fournie. Le catalogue affiche un message d’attente et distingue les domaines d’expertise des programmes. Les pistes sont conservées en brouillon sans objectifs, durée ou prix inventés. Le build bloque une formation publiée incomplète.

## Validation avant publication éventuelle

- [ ] Validation éditoriale par Charles-Antoine.
- [ ] Adresse e-mail et coordonnées professionnelles confirmées.
- [ ] Portrait authentique et droits, si utilisé.
- [ ] Droits de reproduction de la sculpture et de sa photographie pour un usage commercial.
- [ ] Programmes approuvés, objectifs, modalités, durée, tarif et accessibilité.
- [ ] Mentions légales, responsable de publication et hébergeur définitifs.
- [ ] Informations sur les traitements de données et obligations de formation validées.
- [ ] Domaine, métadonnées de production et règles d’indexation ajustés.
