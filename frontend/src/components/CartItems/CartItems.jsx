import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product_data, newProducts, cartItems, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="AllCart">
      <div className="cartMain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {newProducts.map((e) => {
        if (cartItems[e._id] > 0) {
          return (
            <div className="cartItem">
              <img src={e.image} alt="error" id="proimg" />
              <p id="propr">{e.name}</p>
              <p id="proprprice">₹{e.new_price}</p>
              <button id="qbtn">{cartItems[e._id]}</button>
              <p id="proprmul">₹{e.new_price * cartItems[e._id]}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e._id)}
                alt="error"
                id="remicon"
              />
            </div>
          );
        }
        return null;
      })}

      <button id="checkoutbtn">PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default CartItems;
