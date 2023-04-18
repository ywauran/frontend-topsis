import React, { useState, useEffect } from "react";

const AlternativeValuePage = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Alternatif
              </th>
              <th scope="col" className="px-6 py-3">
                Tipe
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">Canon</td>
              <td className="px-6 py-4">
                <select name="" id="" className="input">
                  <option value="">Mirrorless</option>
                  <option value="">DSLR</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <select name="" id="" className="input">
                  <option value="">2 Juta</option>
                  <option value="">3 Juta</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => setOpen(!open)} className="button__primary">
          Proses Algoritma
        </button>
      </div>
      {open ? (
        <>
          <div>Hello</div>
        </>
      ) : null}
    </>
  );
};

export default AlternativeValuePage;
