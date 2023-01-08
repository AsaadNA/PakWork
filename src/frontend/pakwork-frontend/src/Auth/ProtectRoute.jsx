import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isJwtExpired } from "jwt-check-expiration";

const ProtectedRoute = () => {
  let isExipred = true;
  if (localStorage.getItem("userToken") !== null) {
    const Token = localStorage.getItem("userToken");
    isExipred = isJwtExpired(Token);
    if (isExipred) {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    }
  }
  return isExipred === false ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
