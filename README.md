# Change & Projects — V1

Site vitrine statique français : Astro, TypeScript et CSS. Aucun CMS, base de données ni traceur. Polices et images servies avec le site.

- Site : https://youplala.github.io/changeandprojects/
- Dépôt : https://github.com/Youplala/changeandprojects
- Version locale : http://127.0.0.1:4321/

## Développement

Node.js 26 et npm. Installer avec `npm ci`, puis lancer `npm run dev`.
Le serveur Astro reste en arrière-plan ; `npx astro dev stop` permet de l’arrêter.

## Vérification

```bash
npm run check
npm run build
npm test
```

Pour reproduire le build GitHub Pages :

```bash
DEPLOY_BASE=/changeandprojects npm run build
DEPLOY_BASE=/changeandprojects npm test
```

Les liens et images passent par `src/utils/paths.ts` pour fonctionner aussi bien à la racine locale que sous le chemin GitHub Pages. Les tests contrôlent les ressources, les liens et les ancres.

## Déploiement

Chaque push sur `main` lance `.github/workflows/deploy.yml` : installation verrouillée, vérification Astro, build, tests, puis publication de `dist/` sur GitHub Pages. Le workflow peut également être lancé manuellement dans Actions. Pages doit utiliser la source **GitHub Actions**.

Seule la V1 est publiée. Les autres propositions restent dans leurs dossiers locaux séparés.

## Contenus et validation

Les données sont centralisées dans `src/data/site.ts`. Les formations non validées gardent `published: false` ; une formation publiée incomplète bloque le build. Aucun email, tarif ou programme n’a été inventé. Les boutons de contact ouvrent le profil LinkedIn confirmé.

Les textes et mentions légales sont encore provisoires. L’indexation reste désactivée (`noindex, nofollow`). Les sources et crédits des photos, de la sculpture et du logo figurent dans `CONTENT.md`. Les droits de reproduction restent à confirmer ; aucune licence de réutilisation de ces visuels n’est accordée par ce dépôt public.

Les fichiers de travail locaux, captures QA, métadonnées d’outils, variables d’environnement et photos sources inutilisées sont exclus du dépôt. Le maître du logo reste inclus pour reproduire ses exports.
