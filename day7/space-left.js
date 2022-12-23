const fs = require("fs");
const path = require("path");

let directories = [];
fs.readFile(path.join(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\r\n");
  lines.forEach((line, i) => {
    let name = "";
    let children = [];
    let currentSize = 0;

    if (line.startsWith("$ cd") && !line.endsWith("..")) {
      name = line.split(" ")[2];

      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].match(/^\d/)) {
          currentSize += parseInt(lines[j].split(" ")[0]);
        }
        if (lines[j].startsWith("dir ")) {
          children.push(lines[j].split(" ")[1]);
        } else if (lines[j].startsWith("$ cd")) {
          break;
        }
      }

      directories.push({
        name: name,
        size: currentSize,
        totalSize: currentSize,
        children: children,
      });
    }
  });

  directories.forEach((dir) => {
    if (dir.children && dir.children.length > 0) {
      // If dir has children, add them to the list of children for the parent directory
      const newChildren = [];
      dir.children.forEach((childName) => {
        const childDir = directories.find((d) => d.name === childName);
        if (childDir) {
          // Add the child directory to the list of children for the parent directory
          newChildren.push(childDir);
          // If the child directory has children, add them to the list of children for the parent directory
          if (childDir.children && childDir.children.length > 0) {
            childDir.children.forEach((grandchildName) => {
              const grandchildDir = directories.find(
                (d) => d.name === grandchildName
              );
              if (grandchildDir) {
                newChildren.push(grandchildDir);
              }
            });
          }
        } else {
          newChildren.push(childName);
        }
      });
      // Remove duplicate directories from the list of children
      dir.children = newChildren.filter(
        (child, index) => newChildren.indexOf(child) === index
      );
    }
    // If dir has children, add the name and size of each child to the list of children for the parent directory
    if (dir.children && dir.children.length > 0) {
      dir.children = dir.children.map((child) => {
        return {
          name: child.name,
          size: child.size,
        };
      });
    }
  });

  directories.forEach((dir) => {
    if (dir.children && dir.children.length > 0) {
      dir.children.forEach((child) => {
        dir.totalSize += child.size;
      });
    }
  });

  //console.log("Base -> ", { data });
  directories.map((dir) => console.log(dir));
  console.log("Total -> ", findDirectories(directories));
});

function findDirectories(directories) {
  let total = 0;
  directories.forEach((dir) => {
    if (dir.totalSize <= 100000) {
      total += dir.totalSize;
    }
  });
  return total;
}
