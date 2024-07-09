import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseUrl, getToken } from "../utils";
import { useNavigate } from "react-router-dom";
function PrivateNavBar() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
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
  const token = getToken();
  // console.log(token);
  useEffect(() => {
    axios
      .get(`${baseUrl}/cart`, {
        headers: {
          token,
          "access-control-allow-origin": window.location.origin,
        },
      })
      .then((res) => {
        // console.log("res cart:", res);
        setCart(res.data.data);
      })
      .catch((err) => {
        if (!err.response.data.status) {
          navigate("/login");
        }
        console.dir(err);
      });
  }, [token, cart, navigate]);
  return (
    <div id="wz-navbar-container">
      <NavLink to="/" style={{ all: "unset", cursor: "pointer" }}>
        <h1>WatchZone</h1>
      </NavLink>
      <div id="wz-navlinks-container-p">
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
          to="/profile"
        >
          Profile
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activStyle : inactivStyle;
          }}
          to="/orders"
        >
          My orders
        </NavLink>

        <NavLink
          style={({ isActive }) => {
            return isActive ? activStyle : inactivStyle;
          }}
          to="/cart"
        >
          Cart ({cart.length})
        </NavLink>

        <NavLink
          style={{ color: "white" }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default PrivateNavBar;
