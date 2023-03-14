import React from "react";
import { Link } from "react-router-dom";

const TableAlternative = () => {
  const data = [
    {
      alternative: "Canon",
    },
    {
      alternative: "Canon",
    },
    {
      alternative: "Canon",
    },
  ];

  const data_value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <div>
        <div className="flex justify-end">
          <Link to={"../add-alternative"} className="button__third">
            Tambah Alternatif
          </Link>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  Alternatif
                </th>
                <th scope="col" class="px-6 py-3">
                  Deskripsi
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
                  <td class="px-6 py-4">A{number + 1}</td>
                  <td class="px-6 py-4">{item.alternative}</td>
                  <td class="px-6 py-4">asdbasjdabsd</td>
                  <td class="px-6 py-4">
                    <td class="px-6 py-4 text-right flex space-x-4">
                      <Link className="button__secondary">Edit</Link>
                      <button className="button__warn">Hapus</button>
                    </td>
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

export default TableAlternative;
