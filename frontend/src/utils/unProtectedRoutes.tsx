import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnProtectedRoutes = () => {
  const data = localStorage.getItem("access_token");

  return <div>{!data ? <Outlet /> : <Navigate to="/dashboard" />}</div>;
};

export default UnProtectedRoutes;
