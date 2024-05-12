
const fs = require("fs");
const {parse} = require("csv-parse");
const seedrandom = require("seedrandom");

const parseDataType = (data) => {

  if (/^-?\d+$/.test(data)) {
    return parseInt(data, 10);
  }

  else if (/^-?\d*\.\d+$/.test(data)) {
    return parseFloat(data);
  }

  return data;
}

const readCSV = (filePath, keys, parsing) => {
  return new Promise((resolve, reject) => {
    let data = [];

    fs.createReadStream(filePath)
      .pipe(parse({columns: true, skip_empty_lines: true}))
      .on("data", (urow) => {

        if (parsing === "dictionary") {
          const item = {};

          keys.forEach((key) => {
            item[key] = parseDataType(urow[key]);
          });

          data.push(item);
        } else {
          const row = keys.map(key => {
            return parseDataType(urow[key])
          });

          data.push(row);
        }
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", reject)
  });
}

const splitData = (data, testSize = 0.3, seed="something") => {
  const rng = seedrandom(seed);
  const shuffled = data.slice().sort(() => 0.5 - rng());
  const testCount = Math.floor(data.length * testSize);

  const testData = shuffled.slice(0, testCount);
  const trainData = shuffled.slice(testCount);
  return {trainData, testData};
}

module.exports = {parseDataType, readCSV, splitData}
