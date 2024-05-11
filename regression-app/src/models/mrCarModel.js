const { readCSV } = require("./utils");


const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];

const displayUniqueValues = (data, category) => {
  const set = new Set();
  data.forEach(row => {
    set.add(row[category]);
  });

  console.log(set);
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

const processData = (data) => {
  data = simplifyCarNames(data);
  return data;
}

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");
  const processedData = processData(data);

  displayUniqueValues(data, "CarName");

}

computeModel("./public/carprice_assignment.csv");
