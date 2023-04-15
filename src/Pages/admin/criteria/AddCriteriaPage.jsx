import React, { useState } from "react";
import { uid } from "uid";
import { app } from "../../../config";
import { set, ref, getDatabase } from "firebase/database";

const db = getDatabase(app);
const AddCriteriaPage = () => {
  const [criteria, setCriteria] = useState("");
  const [weight, setWeight] = useState(0);
  const addCriteria = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/criteria/${uuid}`), {
      criteria,
      weight,
      uuid,
    });
  };
  return (
    <>
      <form onSubmit={addCriteria}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="label__input">
              Kriteria
            </label>
            <input
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              type="text"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="" className="label__input">
              Bobot
            </label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              className="input"
            />
          </div>
        </div>
        <button type="submit" className="button__primary mt-6 w-full">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddCriteriaPage;
