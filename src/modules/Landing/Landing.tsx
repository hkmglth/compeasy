import { useAuth } from "hooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import getToken from "utils/getToken";
import "./landing.css";
const Landing = () => {
  let token: string = "";
  useEffect(() => {
    token = getToken().headers.Authorization;
  }, []);

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
