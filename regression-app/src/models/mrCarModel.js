const { readCSV } = require("./utils");


const textCategories = ["CarName", "fueltype", "aspiration", "carbody", "drivewheel", "enginelocation", "enginetype", "fuelsystem"];
const numericCategories = [
  "symboling", "wheelbase", "carlength","carwidth","carheight",
  "curbweight", "enginesize", "boreratio", "stroke","compressionratio",
  "horsepower","peakrpm","citympg","highwaympg"
];
const textToNumberCategories = ["doornumber", "cylindernumber"];
const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];

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

  const processedData = data.map(row => {
    const newRow = [];

    for (const key in row) {
      if (textCategoriesMapping.has(key)) {
        const categoryValues = textCategoriesMapping.get(key);
        const encodedValues = oneHotEncode(row[key], categoryValues);
        newRow.push(...encodedValues);

        // oneHotEncode(row[key], categoryValues).forEach((value, index) => {
        //   newRow.push(`${key}: ${categoryValues[index]} - ${value}`)
        // })
      }
    }

    newRow.push(...numericCategories.map(category => row[category]));
    // newRow.push(...numericCategories.map(category => `${category} - ${row[category]}`));

    textToNumberCategories.forEach(category => {
      newRow.push(parseTextToNumber(row[category]));
    });

    return newRow;
  });

  console.log(processedData);
  return {processedData};
}

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");

  const {processedData} = processData(data);

}

computeModel("./public/carprice_assignment.csv");
