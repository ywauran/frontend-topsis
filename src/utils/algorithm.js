export const normalizeMatrix = (data) => {
  const numAlternatives = data.length;
  const numCriteria = Object.keys(data[0].cameraAttributes).length;
  const sumSquaredAttributes = {};

  for (let i = 0; i < numAlternatives; i++) {
    for (let j = 0; j < numCriteria; j++) {
      const attributeName = Object.keys(data[i].cameraAttributes)[j];
      const attributeValue = data[i].cameraAttributes[attributeName];
      if (sumSquaredAttributes[attributeName] === undefined) {
        sumSquaredAttributes[attributeName] = 0;
      }
      sumSquaredAttributes[attributeName] += attributeValue * attributeValue;
    }
  }

  const normalizedMatrix = [];

  for (let i = 0; i < numAlternatives; i++) {
    const normalizedRow = [];

    for (let j = 0; j < numCriteria; j++) {
      const attributeName = Object.keys(data[i].cameraAttributes)[j];
      const attributeValue = data[i].cameraAttributes[attributeName];
      const sqrtSumSquared = Math.sqrt(sumSquaredAttributes[attributeName]);
      normalizedRow.push(attributeValue / sqrtSumSquared);
    }

    normalizedMatrix.push(normalizedRow);
  }

  return normalizedMatrix;
};

export const calculateWeightedMatrix = (normalizedMatrix, weights) => {
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
};

export const calculateIdealSolutions = (weightedMatrix, isMaximize) => {
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
};

export const calculateDistances = (weightedMatrix, idealSolutions) => {
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
};

export const calculateCloseness = (distances) => {
  const numAlternatives = distances.length;
  const closeness = [];
  const sumDistances = distances.reduce((a, b) => a + b, 0);

  for (let i = 0; i < numAlternatives; i++) {
    closeness.push(distances[i] / sumDistances);
  }

  return closeness;
};

export const rankAlternatives = (closeness) => {
  const numAlternatives = closeness.length;
  const rankedAlternatives = Array.from(Array(numAlternatives).keys()).sort(
    (a, b) => closeness[b] - closeness[a]
  );
  return rankedAlternatives;
};
