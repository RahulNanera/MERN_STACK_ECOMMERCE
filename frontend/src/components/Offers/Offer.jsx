import React from "react";
import "./Offer.css";
import exclusive_image from "../assets/exclusive_image.png";

const Offer = () => {
  return (
    <div className="offers">
      <h1 id="offersh1">Exclusive Offers For You</h1>
      <p id="offersp">ONLY ON BEST SELLERS PRODUCTS</p>
      <button id="btn3">Check Now</button>
      <img src={exclusive_image} alt="error" id="img8" />
    </div>
  );
};

export default Offer;
