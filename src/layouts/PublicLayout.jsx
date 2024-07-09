import React from "react";
import PublicNavBar from "../components/PublicNavBar";
import { Outlet } from "react-router-dom";
function PublicLayout() {
  return (
    <div>
      <PublicNavBar />
      <Outlet />
    </div>
  );
}

export default PublicLayout;
