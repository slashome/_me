/**
 * Valide `data/` contre le moteur épinglé par `.engine-version`.
 *
 *   npm run sync-engine && npm run check
 *
 * Les règles ne sont pas ici : elles vivent dans le moteur, et c'est le but.
 * Ce fichier ne fait que brancher les données dessus.
 */

import agentsData from './data/agents.json' with { type: 'json' };
import conceptsData from './data/concepts.json' with { type: 'json' };
import citationsData from './data/items/citations.json' with { type: 'json' };
import livresData from './data/items/livres.json' with { type: 'json' };
import aphorismesData from './data/journal/aphorismes.json' with { type: 'json' };
import projectsData from './data/projects.json' with { type: 'json' };
import propositionsData from './data/propositions.json' with { type: 'json' };
import { buildIndex, compareAgents, rolesOfAgent } from './engine/_draft/collection/index-builder';
import {
  fromKeyed,
  ROLE_LABELS,
  type Agent,
  type CollectionItem,
  type Concept,
  type JournalEntry,
  type Keyed,
  type Project,
} from './engine/_draft/collection/types';
import {
  report,
  validate,
  validatePropositions,
  validateProjects,
  validateJournal,
} from './engine/_draft/collection/validate';

/** `_comment` documente le fichier, ce n'est pas une entrée. */
function withoutComment<T extends object>(record: Record<string, unknown>): Keyed<T> {
  const { _comment: _ignored, ...rest } = record;
  return rest as Keyed<T>;
}

const agents = fromKeyed<Agent>(withoutComment<Agent>(agentsData));
const concepts = fromKeyed<Concept>(withoutComment<Concept>(conceptsData));
const items = [
  ...fromKeyed<CollectionItem>(withoutComment<CollectionItem>(citationsData)),
  ...fromKeyed<CollectionItem>(withoutComment<CollectionItem>(livresData)),
];
const propositions = fromKeyed<CollectionItem>(withoutComment<CollectionItem>(propositionsData));
const projects = fromKeyed<Project>(withoutComment<Project>(projectsData));
const journal = fromKeyed<JournalEntry>(withoutComment<JournalEntry>(aphorismesData));

/* Le schéma est vérifié sur l'UNION : une proposition référence les mêmes agents et les
   mêmes concepts, et son slug ne doit pas entrer en collision avec un item existant —
   une collision signalerait d'ailleurs que la chose est déjà dans le fonds. */
const { ok, text } = report([
  ...validate(agents, [...items, ...propositions], concepts),
  ...validatePropositions(propositions),
  ...validateProjects(projects),
  ...validateJournal(journal, concepts),
]);
console.log(text);
if (!ok) throw new Error('Contenu invalide — voir ci-dessus.');

/* L'index ne contient QUE le fonds : une proposition n'apparaît sur la page de
   personne tant qu'elle n'est pas adoptée. C'est tout l'intérêt du fichier séparé. */
const index = buildIndex(agents, items, concepts);

const kinds = new Map<string, number>();
for (const a of agents) kinds.set(a.kind, (kinds.get(a.kind) ?? 0) + 1);
console.log(
  `\n${items.length} items · ${agents.length} agents · ${projects.length} projets (${[...kinds]
    .map(([k, n]) => `${k}: ${n}`)
    .join(', ')}) · ${concepts.length} concepts · ${journal.length} entrées de journal · ${propositions.length} proposition(s) en attente`,
);

console.log('\n── Les plus cités');
[...index.byAgent.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 8)
  .forEach(([slug, appearances]) => {
    const agent = index.agents.get(slug)!;
    console.log(
      `   ${String(appearances.length).padStart(3)}  ${agent.name.padEnd(24)} ` +
        rolesOfAgent(index, slug).map((r) => ROLE_LABELS[r]).join(', '),
    );
  });

console.log('\n── Les concepts les plus portés');
[...index.byConcept.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 8)
  .forEach(([slug, list]) => {
    console.log(`   ${String(list.length).padStart(3)}  ${index.concepts.get(slug)!.name}`);
  });

console.log('\n── Agents hors personnes');
for (const agent of [...index.agents.values()]
  .filter((a) => a.kind !== 'person')
  .sort(compareAgents)) {
  console.log(`   ${agent.kind.padEnd(13)} ${agent.name}`);
}
