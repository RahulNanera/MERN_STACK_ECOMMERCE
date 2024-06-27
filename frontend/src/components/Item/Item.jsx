import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="items">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          src={props.image}
          alt="error"
          id="img5"
        />
      </Link>
      <p id="itemp">{props.name}</p>
      <div className="item_price">
        <div className="newPrice">₹{props.new_price}</div>
        <div className="oldPrice">₹{props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
