


const X = [
  [1, 6], // [study hour, sleep hour]
  [2, 2],
  [3, 1],
  [4, 5],
  [5, 7]
];

const Y = [60,55,50,70,85]; // scores

const XWithIntercept = X.map(row => [1].concat(row));

console.log(XWithIntercept);

console.log("------------");
console.log("------------");

console.log(Y);
