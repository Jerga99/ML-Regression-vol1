
const { readCSV, splitData } = require("./utils");
const MLR = require("ml-regression-multivariate-linear");

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

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");

  const {processedData} = processData(data);
  const {trainData, testData} = splitData(processedData);
  const model = trainModel(trainData);

  console.log(model);

}

computeModel("./public/carprice_assignment.csv");
