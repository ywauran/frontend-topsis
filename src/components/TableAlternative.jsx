import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from "../config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import ModalDeleteAlternative from "./ModalDeleteAlternative";

const db = getDatabase(app);

const TableAlternative = () => {
  const [data, setData] = useState([]);
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getData = () => {
    const dbRef = ref(db, "alternative");
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
      console.log(data);
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = () => {
    if (selectedAlternative) {
      const { key } = selectedAlternative;
      remove(ref(db, `alternative/${key}`))
        .then(() => {
          console.log("Alternative deleted successfully");
          setShowModal(false);
          setSelectedAlternative(null);
        })
        .catch((error) => {
          console.error("Error deleting alternative:", error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Link to="../add-alternative" className="button__third">
            Tambah Alternatif
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Kamera
                </th>
                <th scope="col" className="px-6 py-3">
                  Model Kamera
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga Kamera
                </th>
                <th scope="col" className="px-6 py-3">
                  Resolusi Foto Kamera (Pixel)
                </th>
                <th scope="col" className="px-6 py-3">
                  Resolusi Video Kamera (Pixel)
                </th>
                <th scope="col" className="px-6 py-3">
                  Daya Baterai Kamera
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index + 1}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">A{index + 1}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex px-6 py-4 space-x-4 text-right">
                      <Link
                        to={`../edit-alternative/${item.key}`}
                        className="button__secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="button__warn"
                        onClick={() => {
                          setSelectedAlternative(item);
                          setShowModal(true);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center">
                    Tidak ada alternatif yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <ModalDeleteAlternative
          title="Hapus Alternatif"
          message="Apakah Anda yakin ingin menghapus alternatif ini?"
          onClose={() => {
            setShowModal(false);
            setSelectedAlternative(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default TableAlternative;
