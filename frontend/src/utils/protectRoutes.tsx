import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout";

const ProtectedRoutes = () => {
  const data = localStorage.getItem("access_token");

  return (
    <div>
      {data ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default ProtectedRoutes;
