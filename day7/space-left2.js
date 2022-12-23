const fs = require("fs");
const path = require("path");

let directories = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;

  // Split the data into an array of lines
  const lines = data.split("\r\n");

  // Loop through the lines and process each one
  lines.forEach((line) => {
    // If the line starts with $ cd and does not end with ..
    if (line.startsWith("$ cd") && !line.endsWith("..")) {
      // Get the name of the directory
      const name = line.split(" ")[2];

      // Get the size of the directory

      // Get the list of children

      // Add the directory to the list of directories
      directories.push({
        name: name,
        size: size,
        totalSize: size,
        children: children,
      });
    }
  });

  console.log("🚀 ~ directories", directories);
});
