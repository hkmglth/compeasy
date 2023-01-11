import { useAuth } from "hooks";
import React from "react";
import { Navigate } from "react-router-dom";
import STORAGEKEYS from "utils/StorageKeys";
import "./landing.css";
const Landing = () => {
  const { token } = useAuth();
  return (
    <>
      {token && token.length !== 0 ? (
        <Navigate to={"dashboard"} replace />
      ) : (
        <Navigate to={"login"} replace />
      )}
    </>
  );
};

export default Landing;
