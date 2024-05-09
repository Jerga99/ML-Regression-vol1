
const { readCSV } = require("./utils");

const splitData = (data, testSize = 0.3) => {
  const shuffled = data.slice().sort(() => 0.5 - Math.random());
  const testCount = Math.floor(data.length * testSize);

  const testData = shuffled.slice(0, testCount);
  const trainData = shuffled.slice(testCount);
  return {trainData, testData};
}

async function computeModel(path) {
  const data = await readCSV(path, ["age", "experience", "income"]);

  const {testData, trainData} = splitData(data);

  console.log(testData);
  console.log("TRAIN DATA");
  console.log(trainData);
}

computeModel("./public/age_exp_salary_dataset.csv");
