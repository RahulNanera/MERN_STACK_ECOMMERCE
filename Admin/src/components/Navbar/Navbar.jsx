import React from "react";
import "./Navbar.css";
import logoImg from "../../assets/nav-logo.svg";
import profileImg from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logoImg} alt="" id="logoImg" />
      <img src={profileImg} alt="" id="profileImg" />
    </div>
  );
};

export default Navbar;
