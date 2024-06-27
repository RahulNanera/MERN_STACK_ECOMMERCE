import React from "react";
import "./Newslatter.css";

const Newslatter = () => {
  return (
    <div className="newlatter">
      <h1 id="newlatterh1">Get Exclusive Offers On Your Emails</h1>
      <p id="newslatterp">Subscribe to our newlatter and stay updated</p>
      <input type="email" placeholder="Enter your email" id="mail" />
      <button id="newlatterbtn">Subscribe</button>
    </div>
  );
};

export default Newslatter;
