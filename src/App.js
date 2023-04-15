import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainAdmin from "./pages/admin/MainAdmin";
import MainUser from "./pages/user/MainUser";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pages/*" element={<MainAdmin />} />
        <Route path="/*" element={<MainUser />} />
      </Routes>
    </>
  );
};

export default App;
