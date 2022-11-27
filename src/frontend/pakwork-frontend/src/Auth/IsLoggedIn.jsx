import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = () => {
  return localStorage.getItem("userToken") ? (
    <Navigate to="/dashboard/profile" />
  ) : (
    <Outlet />
  );
};

export default IsLoggedIn;
