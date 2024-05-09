
const fs = require("fs");
const {parse} = require("csv-parse");

const parseDataType = (data) => {

  if (/^-?\d+$/.test(data)) {
    return parseInt(data, 10);
  }

  else if (/^-?\d*\.\d+$/.test(data)) {
    return parseFloat(data);
  }

  return data;
}

const readCSV = (filePath, keys) => {
  return new Promise((resolve, reject) => {
    let data = [];

    fs.createReadStream(filePath)
      .pipe(parse({columns: true, skip_empty_lines: true}))
      .on("data", (urow) => {
        const row = keys.map(key => {
          return parseDataType(urow[key])
        });

        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", reject)
  });
}

module.exports = {parseDataType, readCSV}
