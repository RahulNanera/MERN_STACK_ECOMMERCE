import React from "react";
import "./Hero.css";
import hand_icon from "../assets/hand_icon.png";
import hero from "../assets/hero_image.png";

function Hero() {
  return (
    <div className="hero">
      <h5 id="heroh5">NEW ARRIVALS ONLY</h5>
      <p id="herop1">new</p>
      <img src={hand_icon} alt="error" id="img3" />
      <p id="herop2">collections for everyone</p>
      <p id="herop3">Latest Collections</p>
      <img src={hero} alt="error" id="img4" />
    </div>
  );
}

export default Hero;
