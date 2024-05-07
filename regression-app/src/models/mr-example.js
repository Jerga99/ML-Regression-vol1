
const math = require("mathjs");

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

console.log(XTransposedY);




