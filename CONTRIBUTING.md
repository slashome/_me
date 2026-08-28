# Contribuer

Ce dépôt est le fonds personnel de Florian Boulestreau : ce qu'il garde, et ce qui l'a
formé. Il est ouvert parce que **deux choses valent mieux quand elles viennent
d'ailleurs** — les corrections, et les découvertes.

Ce sont deux gestes différents, et ils ne passent pas par la même porte.

## Corriger

Une erreur de fait, une orthographe, une attribution fausse, une traduction douteuse :
**PR directe sur `data/`**.

L'import initial en contient à coup sûr — dix orthographes ont déjà été corrigées à
l'aveugle, et [`data/RAPPORT-import.md`](./data/RAPPORT-import.md) les liste toutes en
demandant qu'on les relise. Les titres sont des incipits générés par machine. Plusieurs
attributions sont marquées `disputed` faute de source primaire.

**Une correction porte sa source.** C'est la seule règle non négociable, et elle
s'applique à tout le monde, y compris à ceux qui ont écrit le dépôt. Un lien vers une
édition, un dictionnaire, Quote Investigator, une page d'encyclopédie — pas « je crois
me souvenir ».

## Faire découvrir quelque chose

Une citation, un livre, un disque, une vidéo : **PR sur
[`data/propositions.json`](./data/propositions.json)**.

Pas sur `data/items/`. Ce n'est pas une formalité : l'inventaire dit *ce qui m'a
formé*, et rien ne forme personne avant d'être lu. Une proposition y entrer directement
en ferait un mensonge, et `added` — la date d'entrée dans le fonds — deviendrait faux.

Une proposition attend. Si elle est adoptée, elle est déplacée dans l'inventaire,
`added` prend le jour de l'adoption, et **`suggestedBy` reste** : celui qui a fait
découvrir quelque chose devient un agent du fonds, avec sa page, où l'on voit ce qu'il
a apporté.

Une proposition peut rester longtemps sans être adoptée, et peut ne jamais l'être. Ce
n'est pas un rejet de la chose proposée — c'est un fonds personnel, pas un catalogue.

**Si écrire du JSON ne te dit rien**, [ouvre une issue](../../issues/new/choose) : il y
a un formulaire pour ça, et il produit exactement les mêmes informations.

## Les trois règles

1. **`note` ne se touche pas.** C'est le champ qui dit *pourquoi le propriétaire garde
   une chose*. C'est sa voix. Un contributeur dispose de `context` pour expliquer les
   circonstances — la CI refuse toute proposition qui écrit `note`.
2. **Une source par affirmation.** Voir plus haut.
3. **Pas de propos de personnes privées identifiables** sans leur accord explicite. Une
   phrase entendue d'un ami, d'un collègue, d'un inconnu dans un train n'entre pas ici,
   même vraie, même belle.

## Ce que la CI vérifie pour toi

Elle tourne sur chaque PR, y compris depuis un fork. Elle refuse :

- une référence vers un agent ou un concept qui n'existe pas ;
- deux items avec le même slug dans le même type ;
- une citation sans son texte ;
- une date de publication qui invente une précision (`published` accepte `"1947"`,
  `"1947-04"`, `"1947-04-12"` — jamais un timestamp) ;
- une langue absente de la liste connue, un rôle inconnu, une URL qui n'en est pas une ;
- une proposition sans `suggestedBy`, ou qui écrit `note`.

Tu n'as donc pas à connaître le schéma par cœur : propose, la CI te dira.

## La forme d'une proposition

La clé est le slug, et il doit être unique dans son type. Convention :
`<nom-de-famille>-<deux ou trois mots significatifs>`.

```json
{
  "arendt-mensonges-plausibles": {
    "type": "citation",
    "title": "Les mensonges sont plus plausibles que la réalité",
    "credits": [{ "agent": "hannah-arendt", "roles": ["author"] }],
    "text": "Les mensonges sont souvent beaucoup plus plausibles… ",
    "context": "Dans Les Origines du totalitarisme.",
    "published": "1951",
    "concepts": ["societe"],
    "suggestedBy": "ton-slug",
    "added": "2026-08-29"
  }
}
```

Si l'auteur, le concept ou toi-même n'existez pas encore dans
[`data/agents.json`](./data/agents.json) ou [`data/concepts.json`](./data/concepts.json),
ajoute-les dans la même PR — la CI refusera la référence morte sinon. Pour t'ajouter
comme agent, le minimum suffit :

```json
{ "ton-slug": { "kind": "person", "name": "Ton Nom" } }
```

Les types disponibles (`citation`, `livre`, `vinyl`, `video`, `film`, `article`), les
rôles et les langues sont définis dans le moteur, à la version épinglée par
[`.engine-version`](./.engine-version).

## Une PR, une chose

Une correction ou une proposition par PR. C'est ce qui permet d'en accepter une et d'en
refuser une autre sans discussion pénible.

## Licence

Le contenu de ce dépôt est sous **CC BY 4.0**. En proposant une contribution, tu
acceptes qu'elle soit publiée sous cette licence.

## Et si c'est refusé

Ça arrive, et ça n'a pas à être justifié longuement. C'est un fonds personnel : son
critère d'entrée est « est-ce que ça m'a formé », pas « est-ce que c'est bien ».
