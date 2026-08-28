*[Français](./CONTRIBUTING.md) · [English](./CONTRIBUTING.en.md)*

# Contributing

This repository is my personal collection: what I keep, and what shaped me. It is open
because **two things are better when they come from someone else** — corrections, and
discoveries.

These are two different gestures, and they don't go through the same door.

> The French version is canonical. If the two ever disagree, trust
> [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Correcting

A factual error, a misspelling, a wrong attribution, a doubtful translation: **open a PR
straight against `data/`**.

The initial import certainly contains some — ten spellings have already been corrected
blind, and [`data/RAPPORT-import.md`](./data/RAPPORT-import.md) lists every one of them
asking me to re-read them. Titles were machine-made from the first words of each quote.
Several attributions are marked `disputed` for want of a primary source.

**A correction carries its source.** That is the one non-negotiable rule, and it applies
to everyone, me included. A link to an edition, a dictionary, Quote Investigator, an
encyclopedia page — not "I think I remember".

## Showing me something

A quote, a book, a record, a video: **open a PR against
[`data/propositions.json`](./data/propositions.json)**.

Not against `data/items/`. This isn't red tape: the inventory says *what shaped me*, and
nothing shapes anyone before it has been read. A proposal merged straight into the
inventory would make it a lie, and `added` — the date a thing entered the collection —
would become false.

A proposal waits. If it is adopted, it moves into the inventory, `added` takes the day of
adoption, and **`suggestedBy` stays**: whoever showed me something becomes an agent of the
collection, with their own page, where you can see what they brought.

A proposal may wait a long time, and may never be adopted. That is not a judgement on the
thing itself — this is a personal collection, not a catalogue.

**If writing JSON isn't your thing**, [open an issue](../../issues/new/choose): there is a
form for it, and it produces exactly the same information.

## The three rules

1. **Don't touch `note`.** That is the field saying *why I keep a thing*. It is my voice.
   Contributors have `context` for the circumstances — CI rejects any proposal that
   writes `note`.
2. **One source per claim.** See above.
3. **No words from identifiable private individuals** without their explicit consent. A
   sentence overheard from a friend, a colleague, a stranger on a train does not belong
   here, however true, however beautiful.

## What CI checks for you

It runs on every PR, including from a fork. It rejects:

- a reference to an agent or a concept that doesn't exist;
- two items sharing a slug within the same type;
- a quote without its text;
- a publication date that invents precision (`published` takes `"1947"`, `"1947-04"`,
  `"1947-04-12"` — never a timestamp);
- a language outside the known list, an unknown role, a URL that isn't one;
- a proposal with no `suggestedBy`, or one that writes `note`.

So you don't have to know the schema by heart: propose, and CI will tell you.

## The shape of a proposal

The key is the slug, and it must be unique within its type. Convention:
`<surname>-<two or three meaningful words>`.

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
    "suggestedBy": "your-slug",
    "added": "2026-08-29"
  }
}
```

If the author, the concept, or you yourself aren't in
[`data/agents.json`](./data/agents.json) or [`data/concepts.json`](./data/concepts.json)
yet, add them in the same PR — CI will reject the dangling reference otherwise. To add
yourself as an agent, the bare minimum is enough:

```json
{ "your-slug": { "kind": "person", "name": "Your Name" } }
```

Available types (`citation`, `livre`, `vinyl`, `video`, `film`, `article`), roles and
languages are defined in the engine, at the version pinned by
[`.engine-version`](./.engine-version). Field names are in English; the content is in
whatever language it was written in.

## How you are credited

By default, **with your GitHub account** — it is the one opening the PR or the issue,
there is nothing else to provide. You become an agent of the collection:

```json
{
  "your-slug": {
    "kind": "person",
    "name": "Your Name",
    "links": [{ "label": "GitHub", "url": "https://github.com/your-account" }]
  }
}
```

**If you'd rather not be named**, set `"suggestedBy": "anonyme"`. It is a conventional
agent, it already exists. Your proposal counts just as much; it simply won't carry your
name.

Not to be confused with an **unknown** author: in that case the item has no credit at
all. `anonyme` says "someone chose not to be named", no credit says "we don't know who
this is". Two different things, and the collection tells them apart.

## One PR, one thing

One correction or one proposal per PR. That is what makes it possible to accept one and
decline another without a painful discussion.

## Licence

The content of this repository is under **CC BY 4.0**. By contributing, you accept that
your contribution is published under that licence.

## And if it's declined

It happens, and it doesn't have to be justified at length. This is a personal collection:
the entry criterion is "did this shape me", not "is this good".
