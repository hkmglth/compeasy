import Wave from "components/Wave/Wave";
import React from "react";
import { Outlet } from "react-router-dom";
const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Outlet />
      <Wave />
    </div>
  );
};

export default Auth;
