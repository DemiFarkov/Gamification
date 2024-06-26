import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getIsLoggedUseAuth } from "../../hooks/reduxHooks";

const PrivateRoute = () => {
  const auth = getIsLoggedUseAuth();

  // const auth = true;
  console.log(auth)
  return (  auth ? <Outlet /> : <Navigate to="/" />
  )
};

export default PrivateRoute;
