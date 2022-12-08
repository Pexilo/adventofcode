const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;

  console.log("Base -> ", { data });
  console.log({ marker: findMarker(data, 4) }); // Part 1
  console.log({ marker: findMarker(data, 14) }); // Part 2
});

function findMarker(signal, length) {
  let marker = 0;
  for (let i = 0; i < signal.length; i++) {
    let tempSeq = "";
    for (let j = 0; j < length; j++) {
      tempSeq += signal[i + j];
    }
    if (!/(.).*\1/.test(tempSeq)) {
      marker = i + length;
      break;
    }
  }
  return marker;
}
