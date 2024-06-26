
const math = require("mathjs");
const fs = require("fs");

const X = [
  [1, 6], // [study hour, sleep hour]
  [2, 2],
  [3, 1],
  [4, 5],
  [5, 7]
];

const Y = [60,55,50,70,85]; // scores
const YMatrix = math.matrix(Y).resize([5, 1]);

const XWithIntercept = X.map(row => [1].concat(row));

const XMatrix = math.matrix(XWithIntercept);
const XTransposed = math.transpose(XMatrix);
const XTransposedX = math.multiply(XTransposed, XMatrix);
const XTransposedY = math.multiply(XTransposed, YMatrix);

const inverseXTransposedX = math.inv(XTransposedX);
const BMatrix = math.multiply(inverseXTransposedX, XTransposedY);


const coefficients = BMatrix.toArray().map(c => c[0].toFixed(2));

fs.writeFile(
  "./public/mr-example-coefficients.json",
  JSON.stringify({coefficients}, null, 2),
  (err) => {
    if (err) {
      console.error(`Error writing file:`, err);
    } else {
      console.log("Coefficients has been saved!");
    }
  });




