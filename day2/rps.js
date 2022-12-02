const fs = require("fs");
const path = require("path");
const { RulesMe, RulesElf } = require("./Rules");

let rounds = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;
  rounds = data.split("\r\n").map((p) => p.split(" "));

  console.log("Base ->", { rounds });
  console.log({ Part1: rockPaperSissors(rounds) }); // Part 1
  ultraTopSecretStrat(rounds); // PART 2
});

/**
 *
 * @param {[]} rounds
 * @returns {number} score
 */
function rockPaperSissors(rounds) {
  let score = 0;

  rounds.forEach((round) => {
    const elf1 = round[0];
    const me = RulesMe[round[1]];

    score += me.points;
    if (elf1 === me.loseAgainst) return;
    if (elf1 === me.winAgainst) score += 6;
    else score += 3;
  });

  return score;
}

/**
 *
 * @param {[]} rounds
 */
function ultraTopSecretStrat(rounds) {
  const plays = ["X", "Y", "Z"];

  rounds.forEach((round) => {
    const elf1 = RulesElf[round[0]];
    const elf1Plays = [elf1.winAgainst, elf1.loseAgainst];

    if (round[1] === "X") return (round[1] = elf1.winAgainst);
    if (round[1] === "Y") {
      return (round[1] = plays
        .filter((play) => elf1Plays.indexOf(play) == -1)
        .toString());
    }
    if (round[1] === "Z") return (round[1] = elf1.loseAgainst);
  });

  console.log("Ultra Top Secret Strat 😎 ->", {
    rounds,
  });
  console.log({ Part2: rockPaperSissors(rounds) });
}
