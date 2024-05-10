
const { readCSV } = require("./utils");
const seedrandom = require("seedrandom");
const MLR = require("ml-regression-multivariate-linear");
const fs = require("fs");

const splitData = (data, testSize = 0.3, seed="something") => {
  const rng = seedrandom(seed);
  const shuffled = data.slice().sort(() => 0.5 - rng());
  const testCount = Math.floor(data.length * testSize);

  const testData = shuffled.slice(0, testCount);
  const trainData = shuffled.slice(testCount);
  return {trainData, testData};
}

const calculateR2 = (testOutputs, predictions) => {
  const yMean = testOutputs.reduce((sum, val) => sum + val, 0) / testOutputs.length;
  const ssRes = testOutputs.reduce((sum, output, i) => sum + Math.pow(output - predictions[i], 2), 0);
  const ssTot = testOutputs.reduce((sum, output) => sum + Math.pow(output - yMean, 2), 0);

  return 1 - (ssRes / ssTot);
}

async function computeModel(path) {
  const data = await readCSV(path, ["age", "experience", "income"]);

  const {testData, trainData} = splitData(data, 0.3, "anothersomething!");

  const trainInputs = trainData.map(row => [row[0], row[1]]);
  const trainOutpus = trainData.map(row => [row[2]]);

  const regression = new MLR(trainInputs, trainOutpus, {intercept: true});

  const weights = regression.weights.flatMap(w => w);

  const testInputs = testData.map(row => [row[0], row[1]]);
  const testOutputs = testData.map(row => [row[2]]);
  const predictions = regression.predict(testInputs);

  const r2 = calculateR2(
    testOutputs.flatMap(o => o),
    predictions.flatMap(p => p)
  );

  console.log(r2);

  const jsonData = JSON.stringify({
    intercepts: weights[weights.length - 1],
    slopes: weights.slice(0,  weights.length - 1),
    r2
  }, null, 2);

  fs.writeFile("./public/salaryCoefficients.json", jsonData, (err) => {
    if (err) {
      console.error(`Error writing file:`, err);
    } else {
      console.log("Coefficients has been saved!");
    }
  });
}

computeModel("./public/age_exp_salary_dataset.csv");
