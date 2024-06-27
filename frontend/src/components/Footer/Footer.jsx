import React from "react";
import "./Footer.css";
import footerLogo from "../assets/logo.png";
import instagram_icon from "../assets/instagram_icon.png";
import pintester_icon from "../assets/pintester_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={footerLogo} alt="error" id="img6" />
      <h1 id="footerh1">SHOPPER</h1>
      <div className="footer_links">
        <ul>
          <li>Company</li>
          <li>Products</li>
          <li>Offices</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="footer_socialMedia_icons">
        <img src={instagram_icon} alt="error" id="img7" />
        <img src={pintester_icon} alt="error" id="img7" />
        <img src={whatsapp_icon} alt="error" id="img7" />
      </div>
      <p id="footerp">Copyright @ 2023 - All Right Reserved</p>
    </div>
  );
};

export default Footer;
