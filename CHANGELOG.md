# Changelog

## 2026-10-29

Initial build. 34 special/story fusion recipes for Shin Megami Tensei V: Vengeance, each
cross-checked across at least 2 independently-read sources. Of the charter's named 5 sites
(dotesports.com, gamewitted.com, primagames.com, samurai-gamers.com, escapistmagazine.com), only
samurai-gamers.com returned readable content — dotesports.com, escapistmagazine.com, and
primagames.com's fusion page all returned HTTP 403; gamewitted.com is a client-rendered page that
returns an empty HTML shell to a non-JS fetch (confirmed by raw curl with a browser user-agent).
game8.co and bonus-action.com — both dedicated, non-calculator-mill Vengeance guide sites — were
substituted as the cross-check sources instead. See README.md for the full sourcing note.

3 recipes ship tagged "disputed" rather than having a conflict silently resolved: Anahita (Xuanwu
vs. Nyami Nyami as the second parent), Amanozako (Nue vs. Karasu Tengu as the third parent), and
Nuwa (Demon/Transformed) (Hydra vs. Vritra as the fourth parent). 1 recipe (Abdiel) had a two-way
source split that was resolved 2-vs-1 (Cherub, per game8.co and bonus-action.com, over
samurai-gamers.com's Dominion) and ships "confirmed" with the alternate reading noted. 2 recipes
(Arioch, Anahita's level-29 wording) had an apparent conflict that resolved cleanly once versioned:
game8.co's own page states the pre-Vengeance game used Anzu where Vengeance uses Chimera for
Arioch — shown as confirmed for Vengeance, with the base-game ingredient noted.

3 demons named by samurai-gamers (Belial, Maria, Inanna) are unlocked via a named subquest but have
no parent-demon list in any source reached this session — they are not included, rather than
guessed at.

**The Demon Race Reference table (the charter's secondary deliverable) was not built.** The
charter's premise — that samurai-gamers.com has a static race+race→race table — did not hold up
under a direct fetch: that page's "Regular Fusion" section states, verbatim, "Coming soon." No
other source reached this session has an SMT V-specific race table either; game8.co's own guide
states directly, "It is currently unknown what particular Demon combinations will result in which
races," and offers a different game's (Nocturne's) chart only as an unconfirmed rough estimate.
Building a race table from that would mean presenting an unconfirmed guess, or another game's
chart, as information about this game — exactly what this lane's data-honesty gate exists to stop.
This is a partial-scope finding, not the whole-feature failure the charter's FAILURE PROTOCOL is
pinned to (which concerns the special-fusion list, built in full above).
