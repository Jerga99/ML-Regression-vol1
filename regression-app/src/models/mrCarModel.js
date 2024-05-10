const { readCSV } = require("./utils");


const allCategories = ["symboling","CarName","fueltype","aspiration","doornumber","carbody","drivewheel","enginelocation","wheelbase","carlength","carwidth","carheight","curbweight","enginetype","cylindernumber","enginesize","fuelsystem","boreratio","stroke","compressionratio","horsepower","peakrpm","citympg","highwaympg","price"];

const computeModel = async (path) => {
  const data = await readCSV(path, allCategories, "dictionary");

  console.log(data);
}

computeModel("./public/carprice_assignment.csv");
