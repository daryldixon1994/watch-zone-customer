import React from "react";
import { getToken } from "../utils";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  let token = getToken();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let isBanned = localStorage.getItem("isBanned");
  if (token && isLoggedIn === "true" && isBanned === "false") {
    return <> {children} </>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
