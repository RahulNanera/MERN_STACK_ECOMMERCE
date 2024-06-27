import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth-token")
  );
  return (
    <div className="navbar">
      <img src={logo} alt="error" id="img1" />
      <p id="navp">SHOPPER</p>
      <nav>
        <ul>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Shop
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/mens">
              Mens
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/womens"
            >
              Womens
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
              Kids
            </Link>
          </li>
        </ul>
      </nav>
      {authToken ? (
        <button
          id="btn1"
          onClick={() => {
            localStorage.removeItem("auth-token");
            setAuthToken(null);
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button id="btn1">Login</button>
        </Link>
      )}
      <Link to="/cart">
        <img src={cart_icon} alt="error" id="img2" />
      </Link>
    </div>
  );
};

export default Navbar;
