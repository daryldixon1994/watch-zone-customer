import React from "react";
import { Outlet } from "react-router-dom";
import PrivateNavBar from "../components/PrivateNavBar";
function PrivateLayout() {
  return (
    <div>
      <PrivateNavBar />
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
