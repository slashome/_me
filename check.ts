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
import { buildIndex, compareAgents, rolesOfAgent } from './engine/_draft/collection/index-builder';
import {
  fromKeyed,
  ROLE_LABELS,
  type Agent,
  type CollectionItem,
  type Concept,
  type Keyed,
} from './engine/_draft/collection/types';
import { report, validate } from './engine/_draft/collection/validate';

/** `_comment` documente le fichier, ce n'est pas une entrée. */
function withoutComment<T extends object>(record: Record<string, unknown>): Keyed<T> {
  const { _comment: _ignored, ...rest } = record;
  return rest as Keyed<T>;
}

const agents = fromKeyed<Agent>(withoutComment<Agent>(agentsData));
const concepts = fromKeyed<Concept>(withoutComment<Concept>(conceptsData));
const items = fromKeyed<CollectionItem>(withoutComment<CollectionItem>(citationsData));

const { ok, text } = report(validate(agents, items, concepts));
console.log(text);
if (!ok) throw new Error('Contenu invalide — voir ci-dessus.');

const index = buildIndex(agents, items, concepts);

const kinds = new Map<string, number>();
for (const a of agents) kinds.set(a.kind, (kinds.get(a.kind) ?? 0) + 1);
console.log(
  `\n${items.length} items · ${agents.length} agents (${[...kinds]
    .map(([k, n]) => `${k}: ${n}`)
    .join(', ')}) · ${concepts.length} concepts`,
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
