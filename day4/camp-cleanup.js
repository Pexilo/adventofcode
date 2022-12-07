const fs = require("fs");
const path = require("path");

let sections = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;
  sections = data.split("\r\n").map((d) => {
    return d
      .trim()
      .split(",")
      .map((d) => {
        return d.split("-").map((n) => {
          return parseInt(n);
        });
      });
  });

  console.log("Base -> ", sections);
  console.log({ fullOverlaps: checkForFullOverlaps(sections) }); // Part 1
  console.log({ singleOverlaps: checkForSingleOverlaps(sections) }); // Part 2
});

function checkForFullOverlaps(sections) {
  let overlaps = 0;
  for (let i in sections) {
    if (
      (sections[i][1][0] >= sections[i][0][0] &&
        sections[i][1][0] <= sections[i][0][1] &&
        sections[i][1][1] <= sections[i][0][1] &&
        sections[i][1][1] >= sections[i][0][0]) ||
      (sections[i][0][0] >= sections[i][1][0] &&
        sections[i][0][0] <= sections[i][1][1] &&
        sections[i][0][1] <= sections[i][1][1] &&
        sections[i][0][1] >= sections[i][1][0])
    ) {
      overlaps++;
    }
  }
  return overlaps;
}

function checkForSingleOverlaps(sections) {
  let overlaps = 0;
  for (let i in sections) {
    if (
      (sections[i][1][0] >= sections[i][0][0] &&
        sections[i][1][0] <= sections[i][0][1]) ||
      (sections[i][1][1] >= sections[i][0][0] &&
        sections[i][1][1] <= sections[i][0][1]) ||
      (sections[i][0][0] >= sections[i][1][0] &&
        sections[i][0][0] <= sections[i][1][1]) ||
      (sections[i][0][1] >= sections[i][1][0] &&
        sections[i][0][1] <= sections[i][1][1])
    ) {
      overlaps++;
    }
  }
  return overlaps;
}
