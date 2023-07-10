import React, { useState, useEffect } from "react";
import {
  normalizeMatrix,
  calculateWeightedMatrix,
  calculateIdealSolutions,
  calculateDistances,
  calculateCloseness,
  rankAlternatives,
} from "../../utils/algorithm";
import { app } from "../../config/index";
import { getDatabase, ref, onValue } from "firebase/database";
import { useParams } from "react-router-dom";

const db = getDatabase(app);
const RankingPage = () => {
  const [data, setData] = useState([]);
  const { name, model, price, photo, video, battery } = useParams();
  const [matrix, setMatrix] = useState([
    [4, 7, 6, 8, 3],
    [7, 6, 8, 5, 2],
    [5, 8, 7, 6, 1],
    [6, 7, 5, 9, 4],
  ]);
  const [weights, setWeights] = useState([model, price, photo, video, battery]);
  const [isMaximize, setIsMaximize] = useState([true, true, true, true]);
  const [normalizedMatrix, setNormalizedMatrix] = useState([]);
  const [weightedMatrix, setWeightedMatrix] = useState([]);
  const [idealSolutions, setIdealSolutions] = useState([]);
  const [distances, setDistances] = useState([]);
  const [closeness, setCloseness] = useState([]);
  const [rankedAlternatives, setRankedAlternatives] = useState([]);
  const [cameraAttributes, setCameraAttributes] = useState([]);

  const handleCalculate = () => {
    const normalized = normalizeMatrix(cameraAttributes);
    const weighted = calculateWeightedMatrix(normalized, weights);
    const ideal = calculateIdealSolutions(weighted, isMaximize);
    const dist = calculateDistances(weighted, ideal);
    const close = calculateCloseness(dist);
    const ranked = rankAlternatives(close);

    setNormalizedMatrix(normalized);
    setWeightedMatrix(weighted);
    setIdealSolutions(ideal);
    setDistances(dist);
    setCloseness(close);
    setRankedAlternatives(ranked);
  };

  const getData = () => {
    const dbRef = ref(db, "alternative");
    onValue(dbRef, (snapshot) => {
      let data = [];
      let cameraAttributes = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();
        data.push({
          key: key,
          value: value,
        });

        cameraAttributes.push({
          camera: value.alternative,
          cameraAttributes: value.cameraAttributes,
        });
      });
      setData(data);
      setCameraAttributes(cameraAttributes);
      console.log(cameraAttributes);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-8 shadow-md">
      <h2 className="my-3 text-xl font-bold text-center">Kalkulator TOPSIS</h2>
      <div className="p-4 overflow-x-auto shadow">
        <table className="table">
          <thead className="text-center text-black">
            <tr>
              <th>Alternatif</th>
              {matrix[0].map((_, col) => (
                <th key={col} className="text-center">
                  Kriteria {col + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cameraAttributes.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="text-center">{row.camera}</td>
                <td className="text-center">{row.cameraAttributes.model}</td>
                <td className="text-center">{row.cameraAttributes.price}</td>
                <td className="text-center">
                  {row.cameraAttributes.photoResolution}
                </td>
                <td className="text-center">
                  {row.cameraAttributes.videoResolution}
                </td>
                <td className="text-center">
                  {row.cameraAttributes.batteryPower}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Bobot</h3>
      <div className="p-4 overflow-x-auto shadow">
        <table className="table">
          <thead className="text-center text-black">
            <tr>
              <th>Kriteria</th>
              <th>Bobot</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {weights.map((weight, index) => (
              <tr key={index} className="text-center">
                <td>Kriteria {index + 1}</td>
                <td>{weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleCalculate}
          className="w-full my-4 text-white md:w-48 btn btn-primary"
        >
          Hitung
        </button>
      </div>
      {normalizedMatrix.length > 0 && (
        <>
          <h3 className="text-center">Matriks Keputusan Ternormalisasi:</h3>
          <div className="p-4 overflow-y-auto shadow">
            <table className="table">
              <thead className="text-center text-black">
                <tr>
                  <th>Alternatif</th>
                  {normalizedMatrix[0].map((_, col) => (
                    <th key={col}>Kriteria {col + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {normalizedMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{cameraAttributes[rowIndex].camera}</td>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{value.toFixed(2)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {weightedMatrix.length > 0 && (
        <>
          <h3>Matriks Keputusan Ternormalisasi Terbobot:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr className="font-bold text-black">
                  <th>Alternatif</th>
                  {weightedMatrix[0].map((_, col) => (
                    <th key={col}>Kriteria {col + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weightedMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{cameraAttributes[rowIndex].camera}</td>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{value.toFixed(2)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {idealSolutions.length > 0 && (
        <>
          <h3>Solusi Ideal Positif:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold text-black">Kriteria</th>
                  {idealSolutions.map((_, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-black">Nilai</td>
                  {idealSolutions.map((value, index) => (
                    <td key={index}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Solusi Ideal Negatif:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold text-black">Kriteria</th>
                  {idealSolutions.map((_, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-black">Nilai</td>
                  {idealSolutions.map((value, index) => (
                    <td key={index}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {distances.length > 0 && (
        <>
          <h3>Nilai Separasi Positif:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold text-black">Alternatif</th>
                  {distances.map((_, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-black">Nilai</td>
                  {distances.map((value, index) => (
                    <td key={index}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Nilai Separasi Negatif:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead>
                <tr>
                  <th className="font-bold text-black">Alternatif</th>
                  {distances.map((_, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-black">Nilai</td>
                  {distances.map((value, index) => (
                    <td key={index}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {closeness.length > 0 && (
        <>
          <h3>Nilai Preferensi Terhadap Solusi Ideal:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table mx-auto">
              <thead className="">
                <tr>
                  <th className="font-bold text-black">Alternatif</th>
                  {closeness.map((_, index) => (
                    <th key={index}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold text-black">Nilai</td>
                  {closeness.map((value, index) => (
                    <td key={index}>{value.toFixed(2)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {rankedAlternatives.length > 0 && (
        <>
          <h3>Alternatif Terurut:</h3>
          <div className="p-4 overflow-x-auto shadow">
            <table className="table">
              <thead className="text-center text-black">
                <tr>
                  <th>Rank</th>
                  <th>Alternatif</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {rankedAlternatives.map((alternative, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cameraAttributes[alternative].camera}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RankingPage;
