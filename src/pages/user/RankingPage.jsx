import React, { useState } from "react";

function normalizeMatrix(matrix) {
  const numAlternatives = matrix.length;
  const numCriteria = matrix[0].length;
  const normalizedMatrix = [];

  for (let i = 0; i < numAlternatives; i++) {
    let sumSquared = 0;

    for (let j = 0; j < numCriteria; j++) {
      sumSquared += matrix[i][j] * matrix[i][j];
    }

    const sqrtSumSquared = Math.sqrt(sumSquared);
    const normalizedRow = matrix[i].map((value) => value / sqrtSumSquared);
    normalizedMatrix.push(normalizedRow);
  }

  return normalizedMatrix;
}

function calculateWeightedMatrix(normalizedMatrix, weights) {
  const numAlternatives = normalizedMatrix.length;
  const numCriteria = normalizedMatrix[0].length;
  const weightedMatrix = [];

  for (let i = 0; i < numAlternatives; i++) {
    const weightedRow = [];

    for (let j = 0; j < numCriteria; j++) {
      weightedRow.push(normalizedMatrix[i][j] * weights[j]);
    }

    weightedMatrix.push(weightedRow);
  }

  return weightedMatrix;
}

function calculateIdealSolutions(weightedMatrix, isMaximize) {
  const numCriteria = weightedMatrix[0].length;
  const idealSolutions = [];

  for (let j = 0; j < numCriteria; j++) {
    let columnValues = [];

    for (let i = 0; i < weightedMatrix.length; i++) {
      columnValues.push(weightedMatrix[i][j]);
    }

    const extremum = isMaximize[j]
      ? Math.max(...columnValues)
      : Math.min(...columnValues);
    idealSolutions.push(extremum);
  }

  return idealSolutions;
}

function calculateDistances(weightedMatrix, idealSolutions) {
  const numAlternatives = weightedMatrix.length;
  const numCriteria = weightedMatrix[0].length;
  const distances = [];

  for (let i = 0; i < numAlternatives; i++) {
    let sumSquared = 0;

    for (let j = 0; j < numCriteria; j++) {
      sumSquared += Math.pow(weightedMatrix[i][j] - idealSolutions[j], 2);
    }

    distances.push(Math.sqrt(sumSquared));
  }

  return distances;
}

function calculateCloseness(distances) {
  const numAlternatives = distances.length;
  const closeness = [];
  const sumDistances = distances.reduce((a, b) => a + b, 0);

  for (let i = 0; i < numAlternatives; i++) {
    closeness.push(distances[i] / sumDistances);
  }

  return closeness;
}

function rankAlternatives(closeness) {
  const numAlternatives = closeness.length;
  const rankedAlternatives = Array.from(Array(numAlternatives).keys()).sort(
    (a, b) => closeness[b] - closeness[a]
  );
  return rankedAlternatives;
}

function RankingPage() {
  const [matrix, setMatrix] = useState([
    [4, 7, 6, 8],
    [7, 6, 8, 5],
    [5, 8, 7, 6],
    [6, 7, 5, 9],
  ]);
  const [weights, setWeights] = useState([0.25, 0.25, 0.25, 0.25]);
  const [isMaximize, setIsMaximize] = useState([true, true, true, true]);
  const [rankedAlternatives, setRankedAlternatives] = useState([]);

  const handleMatrixChange = (e, row, col) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = Number(e.target.value);
    setMatrix(updatedMatrix);
  };

  const handleWeightsChange = (e, index) => {
    const updatedWeights = [...weights];
    updatedWeights[index] = Number(e.target.value);
    setWeights(updatedWeights);
  };

  const handleMaximizeChange = (e, index) => {
    const updatedMaximize = [...isMaximize];
    updatedMaximize[index] = e.target.checked;
    setIsMaximize(updatedMaximize);
  };

  const handleCalculate = () => {
    const normalizedMatrix = normalizeMatrix(matrix);
    const weightedMatrix = calculateWeightedMatrix(normalizedMatrix, weights);
    const idealSolutions = calculateIdealSolutions(weightedMatrix, isMaximize);
    const distances = calculateDistances(weightedMatrix, idealSolutions);
    const closeness = calculateCloseness(distances);
    const ranked = rankAlternatives(closeness);
    setRankedAlternatives(ranked);
  };

  return (
    <div className="p-8 shadow-md">
      <h2>TOPSIS Calculator</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Alternative</th>
              {matrix[0].map((_, col) => (
                <th key={col}>Criterion {col + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>Alternative {rowIndex + 1}</td>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleMatrixChange(e, rowIndex, colIndex)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Weights</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Weight</th>
            <th>Maximize</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight, index) => (
            <tr key={index}>
              <td>Criterion {index + 1}</td>
              <td>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => handleWeightsChange(e, index)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={isMaximize[index]}
                  onChange={(e) => handleMaximizeChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCalculate}>Calculate</button>
      {rankedAlternatives.length > 0 && (
        <div>
          <h3>Ranked Alternatives:</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Alternative</th>
              </tr>
            </thead>
            <tbody>
              {rankedAlternatives.map((alternative, index) => (
                <tr key={alternative}>
                  <td>{index + 1}</td>
                  <td>Alternative {alternative + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RankingPage;
