import React from "react";
import { getToken } from "../utils";
import { Navigate } from "react-router-dom";
function PublicRoute({ children }) {
  let token = getToken();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let isBanned = localStorage.getItem("isBanned");
  if (token && isLoggedIn === "true" && isBanned === "false") {
    return <Navigate to="/profile" />;
  } else {
    return <> {children} </>;
  }
}

export default PublicRoute;
