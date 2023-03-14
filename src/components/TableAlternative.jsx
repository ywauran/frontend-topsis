import React from "react";

const TableAlternative = () => {
  const data = [
    {
      alternative: "Steven Pandelaki",
    },
    {
      alternative: "Steven Pandelaki",
    },
    {
      alternative: "Steven Pandelaki",
    },
  ];

  const data_value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
                Alternative
              </th>
              <th scope="col" class="px-6 py-3">
                Mudah Bergaul
              </th>
              <th scope="col" class="px-6 py-3">
                Cara Berkomunikasi dan Berbicara
              </th>
              <th scope="col" class="px-6 py-3">
                Suka Bercanda
              </th>
              <th scope="col" class="px-6 py-3">
                Cara Berpakaian
              </th>
              <th scope="col" class="px-6 py-3">
                Mudah dihubungi oleh Mahasiswa
              </th>
              <th scope="col" class="px-6 py-3">
                Adil dalam Penilaian
              </th>
              <th scope="col" class="px-6 py-3">
                Cara Penyampaian Materi di Kelas
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, number) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">{number + 1}</td>
                <td class="px-6 py-4">A{number + 1}</td>
                <td class="px-6 py-4">{item.alternative}</td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
                <td class="px-6 py-4 text-center">
                  <select name="value" id="value">
                    {data_value.map((item) => (
                      <option value="item">{item}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableAlternative;
