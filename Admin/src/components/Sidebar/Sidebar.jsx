import React from "react";
import "./Sidebar.css";
import Product_CartImg from "../../assets/Product_Cart.svg";
import Product_list_icon from "../../assets/Product_list_icon.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"addproduct"} style={{ textDecoration: "none" }}>
        <div className="add">
          <img src={Product_CartImg} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"listproduct"} style={{ textDecoration: "none" }}>
        <div className="list">
          <img src={Product_list_icon} alt="" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
