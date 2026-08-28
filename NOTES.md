# Notes d'architecture

## Pourquoi pas un paquet npm, pour l'instant

L'objectif visé était : `_me` dépend de `@slashome/inventaire@^0.1`, et npm dit quand
une nouvelle version sort. C'est la bonne cible. Trois choses l'empêchent aujourd'hui.

1. **Le moteur n'est pas à la racine de son dépôt.** `slashome/me` est un site ; le
   modèle vit dans `_draft/collection/`. Or **npm ne sait pas installer un
   sous-répertoire d'un dépôt git** — `npm i github:user/repo` installe la racine.
   (pnpm sait le faire avec `#path:`, npm non.)
2. **Un paquet git doit être installable tel quel**, donc livrer du JS compilé et ses
   `.d.ts`. C'est un vrai petit projet à maintenir, pas un dossier de `.ts`.
3. **Publier sur le registre a un coût de processus** qui ne se justifie pas pour un
   seul consommateur.

En attendant, `.engine-version` + `git clone --branch` donne **exactement la même
sémantique** : une version épinglée, reproductible, et une réponse claire à « faut-il
mettre à jour ? ». Sans registre, sans pipeline de publication, sans build.

### Les trois sorties possibles, le jour venu

| Option | Coût | Ce que ça débloque |
|---|---|---|
| Un dépôt dédié `slashome/inventaire` | un dépôt de plus | `npm i @slashome/inventaire`, propre |
| Passer à **pnpm** | changer de gestionnaire | `git+…#path:/packages/inventaire`, sans dépôt en plus |
| Rester sur `.engine-version` | zéro | ce qui marche déjà |

À trancher quand il y aura un deuxième consommateur — c'est-à-dire quelqu'un qui aura
forké le moteur.

## Validation dans l'éditeur

Le moteur pourra générer un **JSON Schema** depuis ses types. Une clé `"$schema"` en
tête de chaque fichier de `data/` donnerait alors la validation en direct dans VS Code,
**sans build, sans npm install** — c'est le mécanisme le moins cher et le plus rentable
des deux. Il ne remplace pas `npm run check`, qui seul voit les références mortes et
l'unicité par type.
