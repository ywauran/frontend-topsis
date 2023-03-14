import React from "react";

const TableCriteria = () => {
  const data = [
    {
      criteria: "Mudah Bergaul",
      weight: 0.4,
    },
    {
      criteria: "Cara Berkomunikasi dan Berbicara",
      weight: 0.1,
    },
    {
      criteria: "Suka Bercanda",
      weight: 0.1,
    },
    {
      criteria: "Cara Berpakaian",
      weight: 0.1,
    },
    {
      criteria: "Mudah dihubungi oleh Mahasiswa",
      weight: 0.1,
    },

    {
      criteria: "Adil dalam Penilaian",
      weight: 0.1,
    },
    {
      criteria: "Cara Penyampaian Materi di Kelas",
      weight: 0.1,
    },
  ];
  return (
    <>
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
                <td class="px-6 py-4 text-center">{item.weight}</td>
                <td class="px-6 py-4 text-right flex space-x-4">
                  <button>Edit</button>
                  <button>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableCriteria;
