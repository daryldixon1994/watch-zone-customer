import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
function PublicNavBar() {
  const activStyle = {
    all: "unset",
    color: "#b7903d",
    fontWeight: 800,
    cursor: "pointer",
  };
  const inactivStyle = {
    all: "unset",
    color: "#f4f2db",
    cursor: "pointer",
  };
  
  return (
    <div id="wz-navbar-container">
      <NavLink to="/" style={{ all: "unset", cursor: "pointer" }}>
        <h1>WatchZone</h1>
      </NavLink>
      <div id="wz-navlinks-container">
        <NavLink
          style={({ isActive }) => {
            return isActive ? activStyle : inactivStyle;
          }}
          to="/products"
        >
          Products
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return isActive ? activStyle : inactivStyle;
          }}
          to="/register"
        >
          Register
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activStyle : inactivStyle;
          }}
          to="/login"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
}

export default PublicNavBar;
