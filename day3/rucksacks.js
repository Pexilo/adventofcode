const fs = require("fs");
const path = require("path");

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let bags = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;
  bags = data.split("\r\n").map((d) => {
    return d.trim();
  });

  console.log("Base ->", { bags });
  console.log("totalPriority", { Prorities: totalPriority(bags) }); // PART 1
  console.log("findBadges", { BadgesPriorities: findGroups(bags) }); // PART 2
});

/**
 *
 * @param {[]} bags
 * @returns {number} prority
 */
function totalPriority(bags) {
  let score = 0;
  let splittedBags = [];
  bags.map((b) =>
    splittedBags.push(b.match(new RegExp(".{1," + b.length / 2 + "}", "g")))
  );

  splittedBags.forEach((bag) => {
    let prority = 52;
    for (let i in bag[0]) {
      if (
        bag[0].includes(bag[1][i]) &&
        alpha.indexOf(bag[1][i]) + 1 < prority
      ) {
        prority = alpha.indexOf(bag[1][i]) + 1;
      }
    }

    if (prority < 53) score += prority;
  });
  return score;
}

/**
 *
 * @param {[]} bags
 * @returns {number} score
 */
function findGroups(bags) {
  let score = 0;
  let badges = [];
  for (let i in bags) {
    badges.push(bags[i]);

    if (badges.length === 3) {
      score += findBadges(badges);
      badges = [];
    }
  }
  return score;
}

/**
 *
 * @param {[]} badges
 * @returns {number} priority
 */
function findBadges(badges) {
  const Indexes = [0, 1, 2];
  const longestIndex = badges
    .map((a) => a.length)
    .indexOf(Math.max(...badges.map((a) => a.length)));
  Indexes.splice(Indexes.indexOf(longestIndex), 1);

  let priority = 52;
  for (let i in badges[longestIndex]) {
    if (
      badges[Indexes[0]].includes(badges[longestIndex][i]) &&
      badges[Indexes[1]].includes(badges[longestIndex][i]) &&
      alpha.indexOf(badges[longestIndex][i]) + 1 < priority
    ) {
      priority = alpha.indexOf(badges[longestIndex][i]) + 1;
    }
  }
  return priority;
}
