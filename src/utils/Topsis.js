// Define the decision matrix
const decisionMatrix = [
  {
    alternative: "1",
    data: [3, 4, 5, 3],
  },
  {
    alternative: "2",
    data: [3, 4, 3, 3],
  },
  {
    alternative: "3",
    data: [3, 4, 5, 4],
  },
];

// Define the weights and impacts
const weights = [0.25, 0.25, 0.25, 0.25];
const impacts = ["+", "+", "-", "-"];

// Convert the decision matrix data into a 2D array
const matrix = decisionMatrix.map((alternative) => alternative.data);

// Transpose the matrix to get the criteria values as columns
const transposeMatrix = matrix[0].map((_, colIndex) =>
  matrix.map((row) => row[colIndex])
);

// Normalize the decision matrix
const normalizedMatrix = transposeMatrix.map((column) => {
  const sum = column.reduce((acc, val) => acc + val, 0);
  return column.map((value) => value / sum);
});

// Calculate the weighted normalized decision matrix
const weightedNormalizedMatrix = normalizedMatrix.map((column, colIndex) => {
  return column.map((value) => value * weights[colIndex]);
});

// Calculate the ideal and anti-ideal solutions
const idealSolution = weightedNormalizedMatrix.map((column, colIndex) => {
  const isMax = impacts[colIndex] === "+";
  return isMax ? Math.max(...column) : Math.min(...column);
});

const antiIdealSolution = weightedNormalizedMatrix.map((column, colIndex) => {
  const isMax = impacts[colIndex] === "+";
  return isMax ? Math.min(...column) : Math.max(...column);
});

// Calculate the Euclidean distances from each alternative to the ideal and anti-ideal solutions
const distancesToIdeal = normalizedMatrix.map((row) =>
  Math.sqrt(
    row.reduce(
      (acc, value, colIndex) =>
        acc + Math.pow(value - idealSolution[colIndex], 2),
      0
    )
  )
);
const distancesToAntiIdeal = normalizedMatrix.map((row) =>
  Math.sqrt(
    row.reduce(
      (acc, value, colIndex) =>
        acc + Math.pow(value - antiIdealSolution[colIndex], 2),
      0
    )
  )
);

// Calculate the relative closeness to the ideal solution
const relativeCloseness = distancesToAntiIdeal.map(
  (value, index) => distancesToIdeal[index] / (distancesToIdeal[index] + value)
);

// Find the index of the alternative with the highest relative closeness
const bestAlternativeIndex = relativeCloseness.indexOf(
  Math.max(...relativeCloseness)
);

// Get the best alternative based on the index
const bestAlternative = decisionMatrix[bestAlternativeIndex];

// Output the best alternative
console.log("Best Alternative: ", bestAlternative);
