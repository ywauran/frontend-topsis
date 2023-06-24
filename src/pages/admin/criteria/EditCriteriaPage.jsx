import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, set, ref, getDatabase } from "firebase/database";
import { app } from "../../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = getDatabase(app);

const EditCriteriaPage = () => {
  const { id } = useParams();
  const [criteria, setCriteria] = useState("");
  const [weight, setWeight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the criteria data from the database based on the ID
    const criteriaRef = ref(db, `/criteria/${id}`);
    get(criteriaRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCriteria(data.criteria);
          setWeight(data.weight);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const updateCriteria = (e) => {
    e.preventDefault();
    set(ref(db, `/criteria/${id}`), {
      criteria,
      weight,
      uuid: id,
    })
      .then(() => {
        // Display toast notification for success
        toast.success("Criteria updated successfully");
      })
      .catch((error) => {
        console.error("Error updating criteria:", error);
        // Display toast notification for error
        toast.error("Error updating criteria");
      });
    navigate("/pages/data-criteria");
  };

  return (
    <>
      <form onSubmit={updateCriteria}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <button type="submit" className="w-full mt-6 button__primary">
          Update
        </button>
      </form>
    </>
  );
};

export default EditCriteriaPage;
