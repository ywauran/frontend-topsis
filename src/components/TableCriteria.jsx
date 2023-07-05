import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from "../config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import ModalDeleteCriteria from "./ModalDeleteCriteria";
const db = getDatabase(app);

const TableCriteria = () => {
  const [data, setData] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getData = () => {
    const dbRef = ref(db, "criteria");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = () => {
    if (selectedCriteria) {
      const { key } = selectedCriteria;
      remove(ref(db, `criteria/${key}`))
        .then(() => {
          console.log("Criteria deleted successfully");
          setShowModal(false);
          setSelectedCriteria(null);
        })
        .catch((error) => {
          console.error("Error deleting criteria:", error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Link to={"../add-criteria"} className="button__third">
            Tambah Kriteria
          </Link>
        </div>
        {data.length > 0 ? (
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kriteria
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, number) => (
                  <tr
                    key={number + 1}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{number + 1}</td>
                    <td className="px-6 py-4">C{number + 1}</td>
                    <td className="px-6 py-4">{item.value.criteria}</td>
                    <td className="flex px-6 py-4 space-x-4 text-right">
                      <Link
                        to={`../edit-criteria/${item.key}`}
                        className="button__secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="button__warn"
                        onClick={() => {
                          setSelectedCriteria(item);
                          setShowModal(true);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center">
            Tidak ada kriteria yang tersedia.
          </div>
        )}
      </div>
      {showModal && (
        <ModalDeleteCriteria
          title="Hapus Kriteria"
          message="Apakah Anda yakin ingin menghapus kriteria ini?"
          onClose={() => {
            setShowModal(false);
            setSelectedCriteria(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default TableCriteria;
