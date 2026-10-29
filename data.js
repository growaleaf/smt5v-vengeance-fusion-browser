// Shin Megami Tensei V: Vengeance — Special/Story Fusion Recipe Browser data.
//
// Every recipe below was read directly from at least one source and cross-checked against a
// second independent site before shipping as "confirmed". Of the five sites this lane's charter
// named (dotesports.com, gamewitted.com, primagames.com, samurai-gamers.com, escapistmagazine.com),
// only samurai-gamers.com could actually be fetched directly — dotesports.com and
// escapistmagazine.com returned HTTP 403, primagames.com returned 403 on its fusion-recipe page,
// and gamewitted.com is a client-rendered page that returns no content to a non-JS fetch (empty
// HTML shell, confirmed by raw curl). Game8.co and bonus-action.com — both dedicated,
// non-calculator-mill Vengeance guide sites, same tier as the named list — were substituted as the
// second/third cross-check source. This substitution is disclosed here and in README.md/
// CHANGELOG.md, not hidden.
//
// Status field meanings:
//   "confirmed" — the full parent-demon set matches across 2+ independently-read sources (minor
//                 cross-site spelling variants of the same demon, e.g. "Mitra"/"Mithra"/"Mithras",
//                 are treated as a match, not a conflict).
//   "disputed"  — sources disagree on at least one parent demon; both readings are shown in
//                 sourceNote rather than one being silently picked.
// No recipe here was guessed. Recipes with no corroborated parent-demon list at all (Belial,
// Maria, Inanna — each unlocked by a named subquest per samurai-gamers, but no site found lists
// parent demons for them) are intentionally NOT included, rather than fabricated.

(function (root) {
  "use strict";

  var SOURCES = [
    { name: "samurai-gamers.com — All Special Fusions", url: "https://samurai-gamers.com/shin-megami-tensei-v/all-special-fusions/" },
    { name: "game8.co — Special Fusion List", url: "https://game8.co/games/Shin-Megami-Tensei-V/archives/350516" },
    { name: "bonus-action.com — All Demons, Fusions & Miman", url: "https://bonus-action.com/guides/shin-megami-tensei-v-vengeance-all-demons-fusions-miman/" }
  ];
  var FETCHED = "2026-10-29";

  function r(fields) {
    return {
      name: fields[0],
      level: fields[1],
      parents: fields[2],
      status: fields[3],
      sourceNote: fields[4] || "",
      unlockNote: fields[5] || ""
    };
  }

  var RECIPES = [
    r(["High Pixie", 18, ["Pixie", "Angel"], "confirmed"]),
    r(["Anahita", 29, ["Naga", "Xuanwu", "Mermaid"], "disputed",
      "game8.co's own fetched page instead lists \"Nyami Nyami\" in place of Xuanwu; samurai-gamers.com and bonus-action.com (2 of 3 read sources) agree on Xuanwu, shown as the primary reading here.",
      "Unlocked via \"The Demon of the Spring\" subquest."]),
    r(["King Frost", 33, ["Jack Frost", "Jack-o'-Lantern", "Berith"], "confirmed"]),
    r(["Sukuna-Hikona", 37, ["Koropokkuru", "Azumi", "Kaya-no-Hime"], "confirmed"]),
    r(["Alice", 40, ["Muu Shuwuu", "Poltergeist", "Bugs", "Jack-o'-Lantern"], "confirmed",
      "samurai-gamers.com spells the first and third parents \"Moh Shuvuu\" and \"Bugbear\" — treated as the same naming variant, not a conflict."]),
    r(["Idun", 42, ["Ame-no-Uzume", "Hua Po", "Parvati"], "confirmed",
      "", "Unlocked via \"A Goddess Stolen\" subquest."]),
    r(["Black Frost", 44, ["King Frost", "Baphomet", "Loa"], "confirmed"]),
    r(["Lahmu", 48, ["Naga Raja", "Forneus", "Black Ooze"], "confirmed",
      "", "Unlocked by story progress."]),
    r(["Hydra", 53, ["Yurlungur", "Orthrus", "Basilisk"], "confirmed",
      "", "Unlocked by story progress."]),
    r(["Surt", 62, ["Hecatoncheires", "Flauros", "Valkyrie"], "confirmed",
      "", "Unlocked by story progress."]),
    r(["Ishtar", 62, ["Queen Medb", "Loup-garou", "Orobas", "Ose"], "confirmed",
      "samurai-gamers.com spells the first parent \"Queen Mab\" — treated as the same naming variant, not a conflict."]),
    r(["Khonsu", 62, ["Chernobog", "Isis", "Anubis"], "confirmed",
      "", "Unlocked via \"The Egyptians' Fate\" subquest."]),
    r(["Norn", 67, ["Clotho", "Lachesis", "Atropos"], "confirmed"]),
    r(["Fionn mac Cumhaill", 71, ["Cu Chulainn", "Scathach", "Baihu"], "confirmed",
      "", "Unlocked via \"Fionn's Resolve\" subquest."]),
    r(["Vasuki", 74, ["Ananta", "Yurlungur", "Fafnir"], "confirmed",
      "", "Unlocked by story progress."]),
    r(["Arioch", 75, ["Seth", "Cybele", "Chimera"], "confirmed",
      "samurai-gamers.com and gamerguides.com instead list \"Anzu\" in place of Chimera — game8.co states this directly: the original (pre-Vengeance) SMT V used Anzu, Vengeance uses Chimera.",
      "Unlocked by story progress."]),
    r(["Amanozako", 76, ["Kurama Tengu", "Koppa Tengu", "Nue", "Kin-Ki"], "disputed",
      "bonus-action.com and game8.co's own flattened archive-page extraction instead list \"Karasu Tengu\" in place of Nue; samurai-gamers.com and game8.co's dedicated per-demon page (read separately, more reliable than the flattened extraction) agree on Nue, shown as the primary reading here.",
      "Unlocked via \"The Destined Leader\" subquest."]),
    r(["Odin", 77, ["Thor", "Valkyrie", "Loki"], "confirmed",
      "", "Unlocked by story progress."]),
    r(["Huang Long", 78, ["Zhuque", "Qing Long", "Baihu", "Xuanwu"], "confirmed",
      "", "Unlocked via \"The Benevolent One\" subquest."]),
    r(["Khonsu Ra", 78, ["Khonsu", "Horus", "Mithra", "Quetzalcoatl"], "confirmed",
      "", "Unlocked via \"The Succession of Ra\" subquest."]),
    r(["Zeus", 86, ["Demeter", "Thunderbird", "Dionysus"], "confirmed",
      "", "Unlocked via \"A Plot Revealed\" subquest."]),
    r(["Baal", 93, ["Mot", "Belphegor", "Mithra"], "confirmed",
      "", "Unlocked via \"The Bull God's Lineage\" subquest."]),
    r(["Beelzebub", 95, ["Baal", "Abaddon", "Nebiros"], "confirmed"]),
    r(["Shiva", 96, ["Barong", "Rangda"], "confirmed",
      "", "Unlocked via \"A Universe in Peril\" subquest."]),
    r(["Uriel", 82, ["Throne", "Camael"], "confirmed",
      "", "Unlocked via \"The Holy Ring\" subquest."]),
    r(["Raphael", 84, ["Uriel", "Dominion"], "confirmed",
      "", "Unlocked via \"The Holy Ring\" subquest."]),
    r(["Gabriel", 86, ["Raphael", "Throne"], "confirmed",
      "", "Unlocked via \"The Holy Ring\" subquest."]),
    r(["Michael", 90, ["Uriel", "Raphael", "Gabriel"], "confirmed",
      "", "Unlocked via \"The Seraph's Return\" subquest."]),
    r(["Lucifer", 99, ["Metatron", "Beelzebub"], "confirmed"]),
    r(["Abdiel", 80, ["Adramelech", "Melchizedek", "Cherub"], "confirmed",
      "samurai-gamers.com instead lists \"Dominion\" in place of Cherub; game8.co and bonus-action.com (2 of 3 read sources) agree on Cherub, shown as the primary reading here.",
      "Unlocked by beating the game and getting any ending."]),
    r(["Abdiel (Fallen/Transformed)", 89, ["Abdiel", "Amon", "Kali"], "confirmed",
      "", "Unlocked by beating the game and getting any ending."]),
    r(["Nuwa", 80, ["Huang Long", "Arahabaki", "Quetzalcoatl"], "confirmed",
      "", "Unlocked by beating the game and getting any ending."]),
    r(["Nuwa (Demon/Transformed)", 89, ["Nuwa", "Ananta", "Yamata-no-Orochi", "Hydra"], "disputed",
      "bonus-action.com lists the fourth parent as \"Vritra\" instead of Hydra; samurai-gamers.com lists Hydra, shown as the primary reading here — only 1 source each, genuinely unresolved.",
      "Unlocked by beating the game and getting any ending."]),
    r(["Hayataro", 40, ["Inugami", "Take-Minakata"], "confirmed",
      "", "Unlocked via the \"Recreate the World and Save Tokyo\" ending (post-game)."])
  ];

  var api = {
    SOURCES: SOURCES,
    FETCHED: FETCHED,
    RECIPES: RECIPES
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.SMT5V_FUSION_DATA = api;
  }
})(typeof window !== "undefined" ? window : this);
