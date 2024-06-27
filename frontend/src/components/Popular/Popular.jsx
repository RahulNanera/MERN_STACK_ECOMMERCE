import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item.jsx";

const Popular = () => {
  const [popularWomens, setPopularWomens] = useState([]);

  const fetchPopularInWomens = async () => {
    try {
      const response = await fetch("http://localhost:4000/popularinwomen");
      const data = await response.json();
      setPopularWomens(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularInWomens();
  }, []);
  return (
    <div className="popular">
      <h1 id="popularh1">WOMEN</h1>
      <div className="popular_items">
        {popularWomens.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default Popular;
