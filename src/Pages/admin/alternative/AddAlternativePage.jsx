import React, { useState } from "react";
import { uid } from "uid";
import { app } from "../../../config";
import { set, ref, getDatabase } from "firebase/database";

const db = getDatabase(app);
const AddAlternativePage = () => {
  const [alternative, setAlternative] = useState("");
  const [description, setDescription] = useState("");
  const addAlternative = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/alternative/${uuid}`), {
      alternative,
      description,
      uuid,
    });
  };
  return (
    <>
      <form onSubmit={addAlternative}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label htmlFor="" className="label__input">
              Deskripsi
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
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

export default AddAlternativePage;
