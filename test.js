// Headless known-answer / structural tests. Run: node test.js
var data = require("./data.js");
var fs = require("fs");

var failures = 0;

function assert(cond, label) {
  if (!cond) {
    failures++;
    console.log("FAIL " + label);
  } else {
    console.log("PASS " + label);
  }
}

// ───────────────────────────────── structural

assert(data.RECIPES.length === 34, "34 special fusion recipes present (got " + data.RECIPES.length + ")");

data.RECIPES.forEach(function (r) {
  assert(typeof r.name === "string" && r.name.length > 0, "recipe has a non-empty name");
  assert(typeof r.level === "number" && r.level > 0, r.name + " has a positive numeric level");
  assert(Array.isArray(r.parents) && r.parents.length >= 2, r.name + " has at least 2 parent demons");
  assert(r.status === "confirmed" || r.status === "disputed", r.name + " has a valid status");
  // The honesty rule this build is built around: a "disputed" recipe must always carry a named
  // reason in sourceNote — never a silent disagreement.
  if (r.status === "disputed") {
    assert(typeof r.sourceNote === "string" && r.sourceNote.length > 0, r.name + " disputed status carries a non-empty sourceNote");
  }
});

// Exactly 3 recipes carry a "disputed" status — the genuine cross-source conflicts found in the
// actual research (Anahita, Amanozako, Nuwa (Demon/Transformed)).
var disputed = data.RECIPES.filter(function (r) { return r.status === "disputed"; });
assert(disputed.length === 3, "exactly 3 recipes are tagged disputed (got " + disputed.length + ")");
["Anahita", "Amanozako", "Nuwa (Demon/Transformed)"].forEach(function (name) {
  assert(disputed.some(function (r) { return r.name === name; }), name + " is tagged disputed");
});

// ───────────────────────────────── known-answer recipe checks

(function knownAnswerRecipes() {
  var highPixie = data.RECIPES.find(function (r) { return r.name === "High Pixie"; });
  assert(highPixie.level === 18, "High Pixie is level 18");
  assert(highPixie.parents.join("+") === "Pixie+Angel", "High Pixie = Pixie + Angel");

  var beelzebub = data.RECIPES.find(function (r) { return r.name === "Beelzebub"; });
  assert(beelzebub.level === 95, "Beelzebub is level 95");
  assert(beelzebub.parents.join("+") === "Baal+Abaddon+Nebiros", "Beelzebub = Baal + Abaddon + Nebiros");

  var michael = data.RECIPES.find(function (r) { return r.name === "Michael"; });
  assert(michael.parents.join("+") === "Uriel+Raphael+Gabriel", "Michael = Uriel + Raphael + Gabriel");

  var lucifer = data.RECIPES.find(function (r) { return r.name === "Lucifer"; });
  assert(lucifer.level === 99, "Lucifer is level 99");
  assert(lucifer.parents.join("+") === "Metatron+Beelzebub", "Lucifer = Metatron + Beelzebub");
})();

// ───────────────────────────────── filter-by-parent coverage (the core feature)

(function parentLookup() {
  function recipesUsing(parentNameLower) {
    return data.RECIPES.filter(function (r) {
      return r.parents.some(function (p) { return p.toLowerCase().indexOf(parentNameLower) !== -1; });
    });
  }
  var usingThrone = recipesUsing("throne");
  assert(usingThrone.length === 2, "exactly 2 recipes use Throne as a parent (Uriel, Gabriel)");
  assert(usingThrone.some(function (r) { return r.name === "Uriel"; }), "Uriel uses Throne");
  assert(usingThrone.some(function (r) { return r.name === "Gabriel"; }), "Gabriel uses Throne");

  var usingBaal = recipesUsing("baal");
  // Baal itself (as a result) plus Beelzebub, which uses Baal as a parent.
  assert(usingBaal.some(function (r) { return r.name === "Beelzebub"; }), "Beelzebub uses Baal as a parent");
})();

// No recipe fabricated for the three unlock-only, no-known-parents demons.
["Belial", "Maria", "Inanna"].forEach(function (name) {
  assert(data.RECIPES.every(function (r) { return r.name !== name; }), name + " is not fabricated into the recipe list (no source found with its parent demons)");
});

// ───────────────────────────────── copy discipline (T0/T1 liability tier)

var BANNED_WORDS = ["best", "optimal", "strongest", "guaranteed", "approved", "certified", "compliant", "safe", "s-tier", "meta"];

function stripToVisibleText(html) {
  var visible = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  visible = visible.replace(/<style[\s\S]*?<\/style>/gi, "");
  visible = visible.replace(/<[^>]+>/g, " ");
  return visible;
}

(function checkIndexHtmlVisibleCopy() {
  var raw = fs.readFileSync(__dirname + "/index.html", "utf8");
  var visible = stripToVisibleText(raw).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(visible), "index.html rendered copy (tags+scripts+styles stripped) does not contain banned word '" + w + "'");
  });
})();

data.RECIPES.forEach(function (row) {
  var text = JSON.stringify(row).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(text), "RECIPES/" + row.name + " data does not contain banned word '" + w + "'");
  });
});

// No emoji anywhere in source files (S1/S2 — a flag is a real image or it is nothing; emoji
// never carries meaning alone).
(function noEmoji() {
  var emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  ["index.html", "data.js"].forEach(function (f) {
    var raw = fs.readFileSync(__dirname + "/" + f, "utf8");
    assert(!emojiRe.test(raw), f + " contains no emoji");
  });
})();

if (failures > 0) {
  console.log(failures + " test(s) failed.");
  process.exit(1);
} else {
  console.log("All tests passed.");
}
