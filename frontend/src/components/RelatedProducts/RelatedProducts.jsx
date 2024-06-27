import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";
import data_prodcut from "../assets/data";
import Items from "../Item/Item";

const RelatedProducts = () => {
  const [FetchRelatedProducts, setFetchRelatedProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/related");
    const data = await response.json();
    setFetchRelatedProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div className="relatedproducts">
      <h1 id="relatedh1">Related Products</h1>
      <div className="relatedContainer">
        {FetchRelatedProducts.map((item, i) => {
          return (
            <Items
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
