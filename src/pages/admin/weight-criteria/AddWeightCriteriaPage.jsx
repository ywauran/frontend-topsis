import React, { useState, useEffect } from "react";
import { app } from "../../../config";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import { set, ref, getDatabase, onValue } from "firebase/database";

const db = getDatabase(app);
const WeightCriteriaPage = () => {
  const [criteriaData, setCriteriaData] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [subcriteria, setSubcriteria] = useState("");
  const [weight, setWeight] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(db, "criteria");
    onValue(dbRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });

      setCriteriaData(data);
    });
  }, []);

  const handleCriteriaChange = (e) => {
    setSelectedCriteria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uuid = uid();
    set(ref(db, `/subcriteria/${uuid}`), {
      selectedCriteria,
      subcriteria,
      weight,
      uuid,
    });
    navigate("/pages/weight-criteria");
    setSelectedCriteria("");
    setSubcriteria("");
    setWeight("");
  };

  return (
    <div>
      <h2>Bobot Criteria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="criteria" className="label__input">
            Criteria:
          </label>
          <select
            id="criteria"
            value={selectedCriteria}
            onChange={handleCriteriaChange}
            className="input"
          >
            <option value="">Select criteria</option>
            {criteriaData.map((item) => (
              <option key={item.key} value={item.value.criteria}>
                {item.value.criteria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subcriteria" className="label__input">
            Subcriteria:
          </label>
          <input
            id="subcriteria"
            type="text"
            value={subcriteria}
            className="input"
            onChange={(e) => setSubcriteria(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight" className="label__input">
            Weight:
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            className="input"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full mt-6 button__primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WeightCriteriaPage;
