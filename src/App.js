import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainAdmin from "./pages/admin/MainAdmin";
import MainUser from "./pages/user/MainUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pages/*" element={<MainAdmin />} />
        <Route path="/*" element={<MainUser />} />
      </Routes>
    </>
  );
};

export default App;
