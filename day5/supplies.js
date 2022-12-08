const fs = require("fs");
const path = require("path");

let crates = [];
let instructions = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;
  instructions = data
    .split("\r\n\r\n")[1]
    .split("\r\n")
    .map((i) => i.split(/\D/g).filter((i) => i))
    .map((i) => i.map((i) => parseInt(i)));

  const lines = data
    .split(" 1")[0]
    .split("\r\n")
    .map((row) => row.match(/.{1,4}/g))
    .slice(0, -1);

  let sortedData = [];
  for (let i = 0; i < lines.length + 1; i++) {
    for (let j in lines) {
      sortedData.push(lines[j][i].replace(/\s/g, ""));
    }

    crates.push(sortedData.filter((c) => c));
    sortedData = [];
  }

  console.log("Base -> ", crates);
  console.log("Instructions -> ", instructions);
  //console.log({ moveCrates: moveCrates(crates) }); // PART 1
  console.log({ moveCratesByGroup: moveCratesByGroup(crates) }); // PART 2
  console.log("After -> ", crates);
});

/**
 *
 * @param {[]} crates
 * @returns {string} result
 */
function moveCrates(crates) {
  instructions.forEach((inst) => {
    for (let i = 0; i < inst[0]; i++) {
      //console.log(`Move ${inst[0]} from ${inst[1]} to ${inst[2]}`);
      //console.log("Move -> ", crates[inst[1] - 1][0]);
      if (!crates[inst[1] - 1][0]) {
        console.log("No more crates to move");
        break;
      }
      crates[inst[2] - 1].unshift(crates[inst[1] - 1][0]);
      crates[inst[1] - 1].shift();
      //console.log("From -> ", crates[inst[1] - 1]);
      //console.log("To -> ", crates[inst[2] - 1]);
    }
  });
  let result = "";
  for (let c in crates) {
    result += crates[c][0];
  }
  return result;
}

/**
 *
 * @param {[]} crates
 * @returns {string} result
 */
function moveCratesByGroup(crates) {
  instructions.forEach((inst) => {
    let max =
      crates[inst[1] - 1] && crates[inst[1] - 1].length < inst[0]
        ? crates[inst[1] - 1].length
        : inst[0];

    for (let i = max; i > 0; i--) {
      crates[inst[2] - 1].unshift(crates[inst[1] - 1][i - 1]);
    }
    for (let i = max; i > 0; i--) {
      crates[inst[1] - 1].shift();
    }
  });
  let result = "";
  for (let c in crates) {
    result += crates[c][0] ? crates[c][0] : "";
  }
  return result;
}
