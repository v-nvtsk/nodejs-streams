const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');


async function processFile(filename) {
  const inputStream = fs.createReadStream(filename);
  const rl = readline.createInterface({ input: inputStream });

  const result = {}

  for await (const line of rl) {
    line.split(' ').forEach((word) => {
      const filteredWord = word.replaceAll(/\W/g, '');
      if (!result[filteredWord]) result[filteredWord] = 0;
      result[filteredWord] += 1;
    })
  }

  return result;
}

const filename = process.argv[2];

filepath = path.resolve(__dirname, filename);

processFile(filepath).then((result) => {

  const sortedObj = Object.keys(result)
    .sort()
    .reduce((acc, key) => {
      acc[key] = result[key];
      return acc;
    }, {});

  const outStream = fs.createWriteStream(filepath + '.out');
  outStream.write(JSON.stringify(Object.values(sortedObj)));
});