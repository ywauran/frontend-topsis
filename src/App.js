import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import DashboardPage from "./Pages/DashboardPage";
import AlternativePage from "./Pages/AlternativePage";
import CriteriaPage from "./Pages/CriteriaPage";
import CriterionWeightPage from "./Pages/CriterionWeightPage";
import AlternativeValuePage from "./Pages/AlternativeValuePage";

const Home = () => {
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Kriteria", link: "/criteria", icon: MdOutlineDashboard },
    {
      name: "Bobot Kriteria",
      link: "/criterion-weight",
      icon: MdOutlineDashboard,
    },
    { name: "Alternatif", link: "/alternative", icon: MdOutlineDashboard },
    {
      name: "Nilai Alternatif",
      link: "/alternative-value",
      icon: MdOutlineDashboard,
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen "w-16"
        duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/criteria" element={<CriteriaPage />} />
          <Route path="/criterion-weight" element={<CriterionWeightPage />} />
          <Route path="/alternative" element={<AlternativePage />} />
          <Route path="/alternative-value" element={<AlternativeValuePage />} />
        </Routes>
      </div>
    </section>
  );
};

export default Home;
