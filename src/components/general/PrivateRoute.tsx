import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getIsLoggetAuth } from "../../hooks/reduxHooks";

const PrivateRoute = () => {
  const auth = getIsLoggetAuth();

  // const auth = true;
  return (  auth ? <Outlet /> : <Navigate to="/" />
  )
};

export default PrivateRoute;
