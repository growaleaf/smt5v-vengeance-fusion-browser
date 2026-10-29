# Shin Megami Tensei V: Vengeance — Special Fusion Recipe Browser (GCT-031)

Single static page, `index.html`, no build step, no dependencies, no backend, no account/login.

## What it does

A sortable, filterable table of all 34 named special/story fusions in Shin Megami Tensei V:
Vengeance — High Pixie through Lucifer — with required level and every parent demon. Filter by
result name or by typing a parent demon's name to see every recipe that uses it (e.g. "Throne"
surfaces both Uriel and Gabriel). This is the page the player alt-tabbing between 3-4 separate
guide sites for one fusion was missing: no single site lists every special-fusion recipe side by
side, sortable.

## The core discipline: every recipe is cross-checked, every disagreement shown, nothing guessed

Per this lane's standing data-honesty gate (GCT-011/012/015/019/020/023/029/030), a recipe only
ships "confirmed" when 2+ independently-read sources agree on its full parent-demon set. Where
sources disagree on a parent, the recipe ships tagged "disputed" with both readings named in its
note — never silently resolved by guessing which is right.

**3 recipes are genuinely disputed, shown as-is:**
- **Anahita** — samurai-gamers.com and bonus-action.com say the second parent is Xuanwu;
  game8.co's own fetched page instead says Nyami Nyami. Shown as Xuanwu (2 of 3 read sources),
  with the conflict named.
- **Amanozako** — samurai-gamers.com and game8.co's dedicated per-demon page say the third
  parent is Nue; bonus-action.com and game8.co's own flattened archive-page extraction instead
  say Karasu Tengu. Shown as Nue, with the conflict named.
- **Nuwa (Demon/Transformed)** — samurai-gamers.com says the fourth parent is Hydra;
  bonus-action.com says Vritra. One source each, genuinely unresolved — shown as Hydra, with the
  conflict named.

**1 recipe had a conflict that resolved 2-vs-1:** Abdiel's third parent is Cherub per game8.co and
bonus-action.com, vs. Dominion per samurai-gamers.com alone. Shipped as Cherub, with the minority
reading noted.

**1 recipe had a conflict that resolved once versioned:** Arioch's third parent is Chimera per
game8.co and bonus-action.com; samurai-gamers.com and gamerguides.com instead say Anzu. game8.co
states directly that Anzu was the pre-Vengeance (original SMT V) ingredient, replaced by Chimera
in Vengeance — shipped as Chimera for this Vengeance-specific build, with the base-game variant
noted.

**3 demons are intentionally not included:** Belial, Maria, and Inanna are each named by
samurai-gamers.com as unlocked via a specific subquest, but no source reached this session lists
parent demons for any of them. Rather than guess at a recipe, they are omitted — disclosed in the
on-page sources section and in CHANGELOG.md, not silently dropped.

## Sourcing — what the charter named vs. what was actually reachable

The charter named 5 sites to cross-check against: dotesports.com, gamewitted.com, primagames.com,
samurai-gamers.com, escapistmagazine.com. In practice:

- **samurai-gamers.com** — reachable, fetched directly. Primary source for levels and the base
  recipe list.
- **dotesports.com** — HTTP 403 on direct fetch (both WebFetch and curl).
- **escapistmagazine.com** — HTTP 403 on direct fetch.
- **primagames.com** — its "All Demons, Listed" overview page returned 403 on the specific
  fusion-recipe fetch attempted; an earlier general-search snippet showed it lists special-fusion
  demon names/races but no excerpt with ingredients was obtainable.
- **gamewitted.com** — client-rendered (Next.js-style) page; both WebFetch and a raw curl with a
  real browser user-agent returned an HTML shell with no article content (confirmed: `grep` for
  any demon name in the raw HTML returns nothing).

Only 1 of the 5 named sites was actually usable. **game8.co** (its Special Fusion List page, plus
individual per-demon pages for disambiguation) and **bonus-action.com** (a dedicated, actively
maintained Vengeance demon/fusion/miman guide, explicitly covering Vengeance per its own headings)
were substituted as the second and third cross-check sources — both are dedicated fan guide sites
for this specific game, not a calculator-mill (the everycalculators.com pattern this lane already
flagged as thin). This substitution is disclosed here rather than presented as if the named sites
had been used.

Fetched/cross-checked: 2026-10-29.

## Not built: the Demon Race Reference table

The charter's secondary deliverable assumed samurai-gamers.com has a static race+race→race table.
A direct fetch of that exact page shows its "Regular Fusion" section states, verbatim, "Coming
soon" — the table does not exist there. No other source reached this session (game8.co,
bonus-action.com, a targeted WebSearch, megatenwiki.com and gamerbraves.com — both blocked by
Cloudflare on direct fetch, consistent with the charter's own note that this might happen) has an
SMT V-specific race table either. game8.co's own guide states directly: "It is currently unknown
what particular Demon combinations will result in which races" — and offers Nocturne's chart
(a different game) only as an unconfirmed estimate. Building this table would require either
presenting an unconfirmed guess or a different game's chart as information about this one, which
is exactly what this lane's data-honesty gate exists to prevent. See CHANGELOG.md for the full
note. This is a partial-scope finding — the primary deliverable (the special fusion browser) is
built in full and passes its FAILURE PROTOCOL bar by a wide margin (34 recipes from 2-3
independent sources each, vs. the protocol's "fewer than 2 sources for the whole feature" floor).

## Tests

`node test.js` — structural + content tests: 34 recipes present; every recipe has a positive
level and 2+ parents; every "disputed" recipe carries a non-empty sourceNote (no silent
disagreement); exactly 3 recipes are tagged disputed, by name; known-answer checks for High Pixie,
Beelzebub, Michael, and Lucifer's exact recipes; parent-demon filter coverage (Throne → Uriel +
Gabriel); confirms Belial/Maria/Inanna are never fabricated into the list; banned-word grep
against the rendered page (scripts + styles stripped) and against every recipe's own JSON;
no-emoji check on both shipped files. All passing.

`python3 Tools/slop_lint.py Products/SMT5VVengeanceFusionBrowser/` — clean, 0 findings.

No headless Chrome available in this CLI session (no Chrome MCP, per the Think Gate's own
delegation rules). Substituted: ran `node -e "require('./data.js')"` to confirm the data module
loads cleanly, served the folder with `python3 -m http.server`, curled both `index.html` and
`data.js`, and byte-diffed each against the source file on disk — identical.

## Not built (out of scope for this session)

No Stripe/Pro paywall. No deploy, no registry write, no git commit — reserved for the orchestrator
per the charter's acceptance criteria. Demon Race Reference table — see above.
