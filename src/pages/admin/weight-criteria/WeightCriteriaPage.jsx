import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { app } from "../../../config";
import { Link } from "react-router-dom";

const db = getDatabase(app);

const WeightCriteriaPage = () => {
  const [data, setData] = useState([]);
  const [subcriteriaData, setSubcriteriaData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubcriteria, setSelectedSubcriteria] = useState(null);

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

  const handleDelete = (subcriteriaKey) => {
    remove(ref(db, `subcriteria/${subcriteriaKey}`))
      .then(() => {
        console.log("Subkriteria berhasil dihapus");
        getData();
      })
      .catch((error) => {
        console.error("Error menghapus subkriteria:", error);
      });
  };

  const openModal = (subcriteriaKey) => {
    setSelectedSubcriteria(subcriteriaKey);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (selectedSubcriteria) {
      handleDelete(selectedSubcriteria);
      closeModal();
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link to="../add-weight-criteria" className="button__third">
          Tambah
        </Link>
      </div>
      {data.map((item) => (
        <div
          key={item.key}
          className="relative w-full mt-4 overflow-x-auto shadow-md sm:rounded-lg"
        >
          <h2 className="p-4 text-lg">{item.value.criteria}</h2>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Subkriteria
                </th>
                <th scope="col" className="px-6 py-3">
                  Bobot
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {subcriteriaData
                .filter(
                  (subcriteria) =>
                    subcriteria.selectedCriteria === item.value.criteria
                )
                .sort((next, prev) => next.weight - prev.weight)
                .map((subcriteria) => (
                  <tr
                    key={subcriteria.key}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{subcriteria.subcriteria}</td>
                    <td className="px-6 py-4">{subcriteria.weight}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-500"
                        onClick={() => openModal(subcriteria.key)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              {subcriteriaData.filter(
                (subcriteria) =>
                  subcriteria.selectedCriteria === item.value.criteria
              ).length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    Tidak ada subkriteria untuk kriteria ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="w-1/2 p-6 bg-white rounded-lg md:w-1/4">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Konfirmasi Penghapusan
            </h2>
            <p className="mb-4 text-center">
              Apakah Anda yakin ingin menghapus subkriteria ini?
            </p>
            <div className="flex justify-center">
              <button className="button__primary" onClick={confirmDelete}>
                Konfirmasi
              </button>
              <button className="mr-2 button__warn" onClick={closeModal}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightCriteriaPage;
