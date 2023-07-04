import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainAdmin from "../src/pages/admin/MainAdmin";
import RankingPage from "./pages/user/RankingPage";
import MainUser from "./pages/user/MainUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pages/*" element={<MainAdmin />} />
      </Routes>
    </>
  );
};

export default App;
