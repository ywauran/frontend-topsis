import React, { useState, useEffect } from "react";
import { uid } from "uid";
import { app } from "../../../config";
import { useNavigate } from "react-router-dom";
import { set, ref, getDatabase, onValue } from "firebase/database";

const db = getDatabase(app);
const AddAlternativePage = () => {
  const [alternative, setAlternative] = useState("");
  const [subcriteriaData, setSubcriteriaData] = useState([]);
  const [data, setData] = useState([]);
  const [cameraAttributes, setCameraAttributes] = useState({
    model: 1,
    price: 1,
    photoResolution: 1,
    videoResolution: 1,
    batteryPower: 1,
  });

  const navigate = useNavigate();

  const addAlternative = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/alternative/${uuid}`), {
      alternative,
      uuid,
      camera: cameraAttributes,
    });
    navigate("/pages/data-alternative");
  };

  const getData = () => {
    const criteriaRef = ref(db, "criteria");
    onValue(criteriaRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        data.push({
          key,
          value,
        });
      });
      setData(data);
    });
  };

  useEffect(() => {
    getSubcriteria();
    getData();
  }, []);

  const getSubcriteria = () => {
    const subcriteriaRef = ref(db, "subcriteria");
    onValue(subcriteriaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const subcriteriaArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setSubcriteriaData(subcriteriaArray);
      }
    });
  };

  const handleCameraAttributeChange = (attributeName, value) => {
    setCameraAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeName]: value,
    }));
  };

  return (
    <>
      <form onSubmit={addAlternative}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="" className="label__input">
              Alternatif
            </label>
            <input
              value={alternative}
              onChange={(e) => setAlternative(e.target.value)}
              type="text"
              className="input"
            />
          </div>
          {data.map((item) => (
            <div key={item.key}>
              <label className="label__input">{item.value.criteria}</label>
              <select
                name="cameraModel"
                className="input"
                value={cameraAttributes.model}
                onChange={(e) =>
                  handleCameraAttributeChange("model", e.target.value)
                }
              >
                {subcriteriaData
                  .filter(
                    (subcriteria) =>
                      subcriteria.selectedCriteria === item.value.criteria
                  )
                  .sort((next, prev) => next.weight - prev.weight)
                  .map((option) => (
                    <option key={option.weight} value={option.weight}>
                      {option.subcriteria}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
        <button type="submit" className="w-full mt-6 button__primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddAlternativePage;
