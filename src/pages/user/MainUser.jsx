import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { MdHome, MdInfo, MdCalculate } from "react-icons/md";
import ListCameraPage from "./ListCameraPage";
import AboutApplication from "./AboutApplication";
import RankingPage from "./RankingPage";
import FormWeight from "../../components/FormWeight";

const MainUser = () => {
  return (
    <>
      <div className="btm-nav">
        <NavLink end to="/" activeClassName="active">
          <MdHome />
        </NavLink>
        <NavLink to="/calculate" activeClassName="active">
          <MdCalculate />
        </NavLink>
        <NavLink to="/information" activeClassName="active">
          <MdInfo />
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<ListCameraPage />} />
        <Route path="/calculate" element={<FormWeight />} />
        <Route path="/information" element={<AboutApplication />} />
      </Routes>
    </>
  );
};

export default MainUser;
