<!-- Une PR = une chose : une correction, ou une proposition. -->

## De quoi s'agit-il ?

- [ ] **Correction** d'une donnée existante (`data/`)
- [ ] **Proposition** — je fais découvrir quelque chose (`data/propositions.json`)

## Source

<!-- Obligatoire pour une correction. Un lien : édition, dictionnaire,
     encyclopédie, Quote Investigator. Pas « je crois me souvenir ». -->

## Vérifications

- [ ] Je n'ai pas touché au champ `note` (c'est la voix du propriétaire du fonds)
- [ ] Si c'est une proposition, elle est dans `propositions.json` et porte `suggestedBy`
- [ ] Aucun propos d'une personne privée identifiable sans son accord
- [ ] J'ai ajouté dans la même PR les agents ou concepts que je référence, s'ils manquaient

<!-- La CI vérifie le reste : références mortes, slugs en double, dates, langues,
     rôles, URLs. Inutile de connaître le schéma par cœur. -->
