import React, { useState, useEffect } from "react";
import { app } from "../config";
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase(app);
const TableAlternativeUser = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    const dbRef = ref(db, "/alternative");
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

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  Alternatif
                </th>
                <th scope="col" className="px-6 py-3">
                  Deskripsi
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
                  <td className="px-6 py-4">A{number + 1}</td>
                  <td className="px-6 py-4">{item.value.alternative}</td>
                  <td className="px-6 py-4">{item.value.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableAlternativeUser;
