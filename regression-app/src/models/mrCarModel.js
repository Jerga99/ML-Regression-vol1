const { readCSV } = require("./utils");


const textCategories = ["CarName", "fueltype", "aspiration", "carbody", "drivewheel", "enginelocation", "enginetype", "fuelsystem"];
const numericCategories = [
  "symboling", "wheelbase", "carlength","carwidth","carheight",
  "curbweight", "enginesize", "boreratio", "stroke","compressionratio",
  "horsepower","peakrpm","citympg","highwaympg"
];
const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];

const displayUniqueValues = (data, category) => {
  const set = new Set();
  data.forEach(row => {
    set.add(row[category]);
  });
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
    return newRow;
  });

  console.log(processedData);
  return {processedData};
}

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");
  const {processedData} = processData(data);

  console.log(processedData);
}

computeModel("./public/carprice_assignment.csv");
