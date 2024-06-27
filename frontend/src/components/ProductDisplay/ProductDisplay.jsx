import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import star_dull_icon from "../assets/star_dull_icon.png";
import star_icon from "../assets/star_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const [auth, setauth] = useState(localStorage.getItem("auth-token"));
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="imgList">
        <img src={product?.image} alt="error" />
        <img src={product?.image} alt="error" />
        <img src={product?.image} alt="error" />
        <img src={product?.image} alt="error" />
      </div>
      <div className="mainImg">
        <img src={product?.image} alt="error" />
      </div>
      <h1 id="mainName">{product?.name}</h1>
      <div className="rattingStars">
        <img src={star_icon} alt="error" />
        <img src={star_icon} alt="error" />
        <img src={star_icon} alt="error" />
        <img src={star_icon} alt="error" />
        <img src={star_dull_icon} alt="error" />
      </div>
      <div className="p">
        <p>(122)</p>
      </div>
      <div className="prices">
        <p id="old">₹{product?.old_price}</p>
        <p id="new">₹{product?.new_price}</p>
      </div>
      <p id="dis">
        A lightwiegh , usually knitted , pullover shirt , close-fitting and a
        round neckline and short sleeves , worn as an undershirt or outer garmet
        .
      </p>
      <h1 id="sel">Select Size</h1>
      <div className="sizes">
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
        <div>XXL</div>
      </div>
      <button
        onClick={() => {
          addToCart(product._id);
        }}
        id="btnadd"
      >
        Add To Cart
      </button>
      {auth ? (
        <></>
      ) : (
        <p id="requestedLogin">Please login for add product into the cart </p>
      )}
    </div>
  );
};

export default ProductDisplay;
