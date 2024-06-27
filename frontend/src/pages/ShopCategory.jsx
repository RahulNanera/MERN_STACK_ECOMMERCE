import React, { useContext, useEffect, useState } from "react";
import Item from "../components/Item/Item";
import dropdown_icon from "../components/assets/dropdown_icon.png";
import { ShopContext } from "../context/ShopContext";
import "./CSS/shopCategory.css";

function ShopCategory(props) {
  const all_product_data = useContext(ShopContext);

  const [newProducts, setNewProducts] = useState([]);

  const fetchNewProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      const data = await response.json();
      setNewProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewProducts();
  }, []);

  return (
    <div className="shop_category">
      <img src={props.banner} alt="error" id="img9" />
      <p id="showp">Showing 1-12 out of 36 products</p>
      <p id="sortp">
        Sort by <img src={dropdown_icon} alt="error" />
      </p>
      <div className="shop_products">
        {newProducts.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default ShopCategory;
