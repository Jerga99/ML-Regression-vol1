const { readCSV } = require("./utils");


const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];

const simplifyCarNames = (data) => {
  data.forEach((item) => {
    const brand = item.CarName.split(" ")[0].toLowerCase();
    item.CarName = brand;
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
  console.log(processedData);
}

computeModel("./public/carprice_assignment.csv");
