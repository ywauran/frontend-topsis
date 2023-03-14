import React from "react";
import { Link } from "react-router-dom";

const TableCriteria = () => {
  const data = [
    {
      criteria: "Harga",
      weight: 5,
    },
    {
      criteria: "Harga",
      weight: 5,
    },
    {
      criteria: "Harga",
      weight: 5,
    },
    {
      criteria: "Harga",
      weight: 5,
    },
  ];
  return (
    <>
      <div>
        <div className="flex justify-end">
          <Link to={"../add-criteria"} className="button__third">
            Tambah Kriteria
          </Link>
        </div>
        <div class="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No
                </th>
                <th scope="col" class="px-6 py-3">
                  Kode
                </th>
                <th scope="col" class="px-6 py-3">
                  Kriteria
                </th>
                <th scope="col" class="px-6 py-3">
                  Bobot (W)
                </th>
                <th scope="col" class="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, number) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4">{number + 1}</td>
                  <td class="px-6 py-4">C{number + 1}</td>
                  <td class="px-6 py-4">{item.criteria}</td>
                  <td class="px-6 py-4">{item.weight}</td>
                  <td class="px-6 py-4 text-right flex space-x-4">
                    <Link className="button__secondary">Edit</Link>
                    <button className="button__warn">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableCriteria;
