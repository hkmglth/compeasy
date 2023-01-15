import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import getToken from "utils/getToken";
import STORAGEKEYS from "utils/StorageKeys";
const PrivateRoute = () => {

  return (sessionStorage.getItem(STORAGEKEYS.__TOKEN) &&
    sessionStorage.getItem(STORAGEKEYS.__TOKEN)!.length !== 0) ||
    (localStorage.getItem(STORAGEKEYS.__TOKEN) &&
      localStorage.getItem(STORAGEKEYS.__TOKEN)!.length !== 0) ? (
    <Outlet />
  ) : (
    <Navigate to={"login"} replace />
  );
};

export default PrivateRoute;
