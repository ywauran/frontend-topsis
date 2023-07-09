import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes, NavLink } from "react-router-dom"; // Change `Link` to `NavLink`
import Header from "../../components/Header";
import AddCriteriaPage from "./criteria/AddCriteriaPage";
import DataCriteriaPage from "./criteria/DataCriteria";
import EditCriteriaPage from "./criteria/EditCriteriaPage";
import AddAlternativePage from "./alternative/AddAlternativePage";
import DataAlternativePage from "./alternative/DataAlternative";
import EditAlternativePage from "./alternative/EditAlternative";
import { MdOutlineDashboard, MdDescription } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiFolder, FiLogOut } from "react-icons/fi";
import AddWeightCriteriaPage from "./weight-criteria/AddWeightCriteriaPage";
import WeightCriteriaPage from "./weight-criteria/WeightCriteriaPage";

const MainAdmin = () => {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();
  const menus = [
    {
      name: "Kriteria",
      link: "/pages/data-criteria",
      icon: MdDescription,
    },
    {
      name: "Bobot Kriteria",
      link: "/pages/weight-criteria",
      icon: MdDescription,
    },
    {
      name: "Alternatif",
      link: "/pages/data-alternative",
      icon: FiFolder,
    },
  ];
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const Logout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="flex overflow-y-hidden">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="flex justify-end py-3">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex flex-col justify-between h-[90%]">
            <div className="relative flex flex-col gap-4 mt-4">
              {menus?.map((menu, i) => (
                <NavLink
                  to={menu?.link}
                  key={i}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  activeClassName="text-[#FF0000]"
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ))}
              <button
                onClick={() => setOpenModalLogout(true)}
                className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              >
                <div>
                  <FiLogOut size="20" />
                </div>
                <h2
                  className={`whitespace-pre duration-300 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Keluar
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  Keluar
                </h2>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-hidden font-semibold text-gray-900">
          <div>
            <Header />
          </div>
          <div className="p-5">
            <Routes>
              {/* Criteria */}
              <Route path="/add-criteria" element={<AddCriteriaPage />} />
              <Route path="/data-criteria" element={<DataCriteriaPage />} />
              <Route path="/edit-criteria/:id" element={<EditCriteriaPage />} />

              {/* Alternative */}
              <Route path="/add-alternative" element={<AddAlternativePage />} />
              <Route
                path="/data-alternative"
                element={<DataAlternativePage />}
              />
              <Route
                path="/edit-alternative/:id"
                element={<EditAlternativePage />}
              />

              {/* Bobot Criteria */}
              <Route
                path="/add-weight-criteria"
                element={<AddWeightCriteriaPage />}
              />
              <Route path="/weight-criteria" element={<WeightCriteriaPage />} />
            </Routes>
          </div>
        </div>

        {/* Modal Logout */}
        <div
          id="modalLogout"
          tabIndex="-1"
          aria-hidden="true"
          className={`flex items-center fixed top-0 left-0 right-0 z-50 ${
            openModalLogout ? "block" : "hidden"
          } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
        >
          <div className="relative flex items-center justify-center w-full h-max">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-center p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                  Keluar
                </h3>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-center text-gray-500 dark:text-gray-400">
                  Anda yakin ingin keluar ?
                </p>
              </div>

              <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="w-24 button__primary"
                  onClick={() => Logout()}
                >
                  Ya
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  onClick={() => setOpenModalLogout(false)}
                  className="w-24 button__warn"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainAdmin;
