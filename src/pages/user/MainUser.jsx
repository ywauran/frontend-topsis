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
      <div className="z-50 box__shadow btm-nav">
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

      <div className="pb-36">
        <Routes>
          <Route path="/" element={<ListCameraPage />} />
          <Route path="/calculate" element={<FormWeight />} />
          <Route path="/information" element={<AboutApplication />} />
          <Route
            path="/rank/:name/:model/:price/:photo/:video/:battery"
            element={<RankingPage />}
          />
        </Routes>
      </div>
    </>
  );
};

export default MainUser;
