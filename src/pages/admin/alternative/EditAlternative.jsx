import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { app } from "../../../config";
import { getDatabase, ref, onValue, update } from "firebase/database";

const db = getDatabase(app);

const EditAlternative = () => {
  const { id } = useParams();
  const [data, setData] = useState({ alternative: "", description: "" });
  const { alternative, description } = data;
  let navigate = useNavigate();

  const getData = () => {
    const dbRef = ref(db, "alternative");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        if (key === id) {
          data.push({ key, value });
        }
      });

      setData(data[0].value);
    });
  };

  const updateData = (e) => {
    e.preventDefault();
    update(ref(db, `/alternative/${id}`), {
      alternative,
      description,
      uuid: data.uuid,
    });
    navigate("/pages/data-alternative");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form onSubmit={updateData}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="alternative" className="label__input">
              Alternatif
            </label>
            <input
              id="alternative"
              placeholder={data.alternative}
              value={alternative}
              onChange={(e) =>
                setData({ ...data, alternative: e.target.value })
              }
              type="text"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="description" className="label__input">
              Deskripsi
            </label>
            <input
              id="description"
              placeholder={data.description}
              value={description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              type="text"
              className="input"
            />
          </div>
        </div>
        <button type="submit" className="w-full mt-6 button__primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAlternative;
