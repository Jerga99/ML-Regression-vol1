
const { readCSV, splitData, calculateR2 } = require("./utils");
const MLR = require("ml-regression-multivariate-linear");
const math = require("mathjs");
const fs = require("fs");

const textCategories = ["CarName", "fueltype", "aspiration", "carbody", "drivewheel", "enginelocation", "enginetype", "fuelsystem"];
const numericCategories = [
  "symboling", "wheelbase", "carlength","carwidth","carheight",
  "curbweight", "enginesize", "boreratio", "stroke","compressionratio",
  "horsepower","peakrpm","citympg","highwaympg"
];
const textToNumberCategories = ["doornumber", "cylindernumber"];
const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];
const rowCategories = [];

const displayUniqueValues = (data, category) => {
  const set = new Set();
  data.forEach(row => {
    set.add(row[category]);
  });

  console.log(set);
}

const parseTextToNumber = (textNumber) => {
  switch(textNumber) {
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "eight":
      return 8;
    case "twelve":
      return 12;
    default: return 0;
  }
}

const createCategoryMapping = (data) => {
  const categoriesMap = new Map();

  textCategories.forEach((category) => {
    categoriesMap.set(category, [...new Set(data.map(row => row[category]))]);
  });

  return categoriesMap;
}

const simplifyCarNames = (data) => {
  const fixedBrands = {
    "maxda": "mazda",
    "porcshce": "porsche",
    "toyouta": "toyota",
    "vokswagen": "volkswagen",
    "vw": "volkswagen"
  };

  data.forEach((item) => {
    const brand = item.CarName.split(" ")[0].toLowerCase();
    item.CarName = fixedBrands[brand] || brand;
  });

  return data;
}

const oneHotEncode = (value, categoryOptions) => {
  return categoryOptions.map(categoryItem => value === categoryItem ? 1 : 0);
}

const processData = (data) => {
  data = simplifyCarNames(data);
  const textCategoriesMapping = createCategoryMapping(data);

  textCategoriesMapping.forEach((categoryValues, categoryName) => {
    categoryValues.forEach((value) => {
      rowCategories.push(`${categoryName} ${value}`);
    });
  });

  const processedData = data.map(row => {
    const newRow = [];

    for (const key in row) {
      if (textCategoriesMapping.has(key)) {
        const categoryValues = textCategoriesMapping.get(key);
        const encodedValues = oneHotEncode(row[key], categoryValues);
        newRow.push(...encodedValues);
      }
    }

    newRow.push(...numericCategories.map(category => row[category]));

    textToNumberCategories.forEach(category => {
      newRow.push(parseTextToNumber(row[category]));
    });

    newRow.push(row.price);
    return newRow;
  });

  rowCategories.push(...numericCategories, ...textToNumberCategories);

  return {processedData};
}

const trainModel = (trainData) => {
  const inputs = trainData.map(d => d.slice(0, -1));
  const outputs = trainData.map(d => [d.slice(-1)[0]]);

  const mlr = new MLR(inputs, outputs);
  return mlr;
}

const testModel = (testData, model) => {
  const inputs = testData.map(d => d.slice(0, -1));
  const outputs = testData.map(d => d.slice(-1)[0]);

  const predictions = inputs.map(input => model.predict(input));
  const r2 = calculateR2(outputs, predictions);
  return r2;
}

const computeCorrelations = (data) => {
  const prices = data.map(row => row[row.length -1]);

  const correlations = rowCategories.map((_, index) => {
    const inputData = data.map(row => row[index]);
    const correlation = math.corr(inputData, prices);

    return Math.abs(correlation);
  });

  return correlations;
}

const extractCorrelatedData = (processedData, corCategories) => {
  const corData = processedData.map((row, index) => {
    const newRow = [];

    corCategories.forEach(category => {
      const index = rowCategories.indexOf(category);
      if (index >= 0) {
        newRow.push(row[index]);
      }
    });

    newRow.push(row[row.length - 1]);
    return newRow;
  });

  return {corData};
}

const exportData = (trainData, model, corCategories) => {

  const trainDataExport = trainData.map(listRow => {
    const row = {};

    corCategories.forEach((category, index) => {
      row[category] = listRow[index];
    });

    row.price = listRow[listRow.length - 1];
    return row;
  });

  const weights = model.weights.flatMap(w => w);

  const dataToExport = {
    intercept: weights[weights.length - 1],
    slopes: weights.slice(0, weights.length - 1),
    trainData: trainDataExport,
    categories: corCategories
  };

  const jsonData = JSON.stringify(dataToExport, null, 2);

  fs.writeFile("./public/carPrediction.json", jsonData, (err) => {
    if (err) {
      console.error(`Error writing file:`, err);
    } else {
      console.log("Coefficients has been saved!");
    }
  });

}

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");
  const {processedData} = processData(data);

  const correlations = computeCorrelations(processedData);
  const threshold = 0.3;
  const includeFields = ["CarName"];
  const blockedFields = ["citympg"];

  const corCategories = correlations
    .map((cor, index) => ({cor, index}))
    .filter(item => ((
      item.cor > threshold ||
      includeFields.includes(rowCategories[item.index].split(" ")[0]))
    ) && !blockedFields.includes(rowCategories[item.index].split(" ")[0]))
    .map(item => rowCategories[item.index])

  console.log(corCategories);


  const {corData} = extractCorrelatedData(processedData, corCategories);

  const {trainData, testData} = splitData(corData, 0.2, "random1000000");
  const model = trainModel(trainData);
  const r2 = testModel(testData, model);
  console.log(r2);

  exportData(trainData, model, corCategories);

}

computeModel("./public/carprice_assignment.csv");
