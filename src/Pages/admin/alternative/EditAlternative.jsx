import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../../config";
import { getDatabase, ref, onValue, update } from "firebase/database";

const db = getDatabase(app);
const EditAlternative = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [alternative, setAlternative] = useState(data.alternative);
  const [description, setDescription] = useState(data.description);

  const getData = () => {
    const dbRef = ref(db, "alternative");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        if (key === id) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setData(data[0].value);
      console.log(data[0].value);
    });
    console.log(data);
  };

  const updateData = (e) => {
    e.preventDefault();
    update(ref(db, `/alternative/${data.uuid}`), {
      alternative,
      description,
      uuid: data.uuid,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <form onSubmit={updateData}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="label__input">
              Alternatif
            </label>
            <input
              placeholder={data.alternative}
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
              placeholder={data.description}
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
    </div>
  );
};

export default EditAlternative;
