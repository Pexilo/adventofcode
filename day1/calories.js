//readlin
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;

  let sortedElfs = [];
  data
    .split("\n\r")
    .map((e) => e.replace(/\r/g, "").split("\n"))
    .forEach((elf) => {
      sortedElfs.push(elf.filter((n) => n));
    });

  console.log("Base ->", { sortedElfs });

  console.log({ Part1: mostCaloriesElf(sortedElfs) });
  console.log({ Part2: top3MostCaloriesElfs(sortedElfs) });
});

/**
 *
 * @param {[]} elfs
 * @returns {number} max
 */
function mostCaloriesElf(elfs) {
  let max = 0;
  let calories = 0;

  elfs.forEach((elf) => {
    for (let i in elf) {
      calories += parseInt(elf[i]);
    }

    if (calories > max) max = calories;
    calories = 0;
  });

  return max;
}

/**
 *
 * @param {[]} elfs
 * @returns {number} top3
 */
function top3MostCaloriesElfs(elfs) {
  let top3 = [0, 0, 0];
  let calories = 0;
  let minIndex = 0;

  elfs.forEach((elf) => {
    for (let i in elf) {
      calories += parseInt(elf[i]);
    }

    if (top3[minIndex] < calories) {
      top3[minIndex] = calories;
    }

    minIndex = top3.indexOf(Math.min(...top3));
    calories = 0;
  });

  console.log({ Top3: top3 });
  return top3.reduce((a, b) => a + b, 0);
}
