# _me

> Le **contenu** de [slashome.me](https://slashome.me). Le **moteur** est [slashome/me](https://github.com/slashome/me).

Même séparation que `ariane` / `_ariane` : d'un côté un projet qu'on peut forker,
de l'autre ce qui n'appartient qu'à une personne.

```
data/
  agents.json          les gens, groupes, organisations et personnages
  concepts.json        les thèmes du fonds
  items/
    citations.json     l'inventaire, un fichier par type
```

## Pourquoi ce dépôt est séparé

1. **`slashome/me` devient un vrai projet** — un site personnel en forme de jeu vidéo
   que quelqu'un peut forker et remplir avec *son* `_me`. Ça a une valeur propre,
   contrairement à « le site de Florian ».
2. Les commits de contenu cessent de polluer l'historique du code.
3. Le jour où le contenu vient d'ailleurs (ATLAS), c'est ce dépôt qui change, pas le moteur.

Il est **public** : son contenu est fait pour être en ligne. La séparation ne sert
pas au secret, elle sert à la réplicabilité.

## Le moteur, et comment on sait s'il faut le mettre à jour

Le fichier **`.engine-version`** épingle la version de `slashome/me` contre laquelle
ces données sont valides. C'est lui qui répond à « est-ce que `_me` a besoin d'une
mise à jour ? ».

```bash
npm run sync-engine   # clone slashome/me au tag épinglé, dans engine/ (ignoré par git)
npm run check         # valide data/ contre ce moteur
```

Deux questions distinctes, deux mécanismes :

| Question | Réponse |
|---|---|
| Mes données sont-elles valides ? | `npm run check` — références mortes, unicité, invariants |
| Le moteur a-t-il bougé ? | comparer `.engine-version` aux tags de `slashome/me` |

Un moteur plus récent ne rend pas les données invalides. Seul un **changement de
schéma incompatible** le fait — c'est ce que signale un tag majeur.

> **État actuel :** le moteur est épinglé sur `v0.1.0-alpha`, un tag posé sur la branche
> `modele/collection` (non fusionnée). Il deviendra un vrai tag de `main` quand le
> modèle sera stabilisé. Et il n'y a pas encore de paquet npm — la raison est dans
> [`NOTES.md`](./NOTES.md).

## Ce qu'il y a dedans, aujourd'hui

**121 citations** importées d'un export Notion, **72 agents** (68 personnes, 3
personnages de fiction, 1 organisation) et **27 concepts**. Le détail de l'import,
les orthographes corrigées et ce qui n'a pas été inventé sont dans
[`data/RAPPORT-import.md`](./data/RAPPORT-import.md).

⚠️ **Le contenu n'est pas prêt à être publié.** Les titres sont des incipits générés,
plusieurs attributions sont à sourcer, et une citation vient d'un particulier
identifiable. Voir le rapport d'import.
