import React from "react";
import "./Breadcrums.css";
import arrow_icon from "../assets/breadcrum_arrow.png";

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div className="bread">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
      {product?.category} <img src={arrow_icon} alt="" /> {product?.name}
      <img src={arrow_icon} alt="" />
    </div>
  );
};

export default Breadcrums;
