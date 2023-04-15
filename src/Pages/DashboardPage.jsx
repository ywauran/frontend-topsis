import React, { useState } from "react";

function topsis(matrix, weights, impacts) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Step 1: Normalize the decision matrix
  const normalized = [];
  for (let j = 0; j < cols; j++) {
    let sum = 0;
    for (let i = 0; i < rows; i++) {
      sum += matrix[i][j] ** 2;
    }
    const sqrtSum = Math.sqrt(sum);
    const normCol = [];
    for (let i = 0; i < rows; i++) {
      normCol.push(matrix[i][j] / sqrtSum);
    }
    normalized.push(normCol);
  }

  // Step 2: Weight the normalized decision matrix
  const weighted = [];
  for (let j = 0; j < cols; j++) {
    const weightedCol = [];
    for (let i = 0; i < rows; i++) {
      weightedCol.push(normalized[j][i] * weights[j]);
    }
    weighted.push(weightedCol);
  }

  // Step 3: Determine the ideal and negative-ideal solutions
  const ideal = [];
  const negativeIdeal = [];
  for (let j = 0; j < cols; j++) {
    let max = -Infinity;
    let min = Infinity;
    for (let i = 0; i < rows; i++) {
      if (weighted[j][i] > max) {
        max = weighted[j][i];
      }
      if (weighted[j][i] < min) {
        min = weighted[j][i];
      }
    }
    const idealValue = impacts[j] === "+" ? max : min;
    const negativeIdealValue = impacts[j] === "+" ? min : max;
    ideal.push(idealValue);
    negativeIdeal.push(negativeIdealValue);
  }

  // Step 4: Calculate the distance from each alternative to the ideal and negative-ideal solutions
  const idealDistances = [];
  const negativeIdealDistances = [];
  for (let i = 0; i < rows; i++) {
    let idealSum = 0;
    let negativeIdealSum = 0;
    for (let j = 0; j < cols; j++) {
      idealSum += (weighted[j][i] - ideal[j]) ** 2;
      negativeIdealSum += (weighted[j][i] - negativeIdeal[j]) ** 2;
    }
    idealDistances.push(Math.sqrt(idealSum));
    negativeIdealDistances.push(Math.sqrt(negativeIdealSum));
  }

  // Step 5: Calculate the relative closeness to the ideal solution for each alternative
  const closeness = [];
  for (let i = 0; i < rows; i++) {
    closeness.push(
      negativeIdealDistances[i] /
        (idealDistances[i] + negativeIdealDistances[i])
    );
  }

  return closeness;
}

const DashboardPage = () => {
  const [matrix, setMatrix] = useState([
    [500, 0.3, 0.1, 150],
    [450, 0.25, 0.15, 100],
    [600, 0.2, 0.08, 200],
    [400, 0.35, 0.12, 120],
  ]);

  const [weights, setWeights] = useState([0.1, 0.25, 0.2, 0.15]);

  const [impacts, setImpacts] = useState(["+", "-", "+", "+"]);

  const [result, setResult] = useState([]);

  function handleCalculate() {
    const closeness = topsis(matrix, weights, impacts);
    setResult(closeness);
  }

  return (
    <div>
      <h1>TOPSIS Calculation</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Cost</th>
            <th>Benefit 1</th>
            <th>Benefit 2</th>
            <th>Benefit 3</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Alternative {rowIndex + 1}</td>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <label>
          Criteria Weights:
          <input
            type="text"
            value={weights.join(",")}
            onChange={(e) => setWeights(e.target.value.split(",").map(Number))}
          />
        </label>
      </p>
      <p>
        <label>
          Criteria Impacts:
          <input
            type="text"
            value={impacts.join(",")}
            onChange={(e) => setImpacts(e.target.value.split(","))}
          />
        </label>
      </p>
      <button onClick={handleCalculate}>Calculate TOPSIS</button>
      {result.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Alternative</th>
              <th>Relative Closeness</th>
            </tr>
          </thead>
          <tbody>
            {result.map((value, index) => (
              <tr key={index}>
                <td>Alternative {index + 1}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
