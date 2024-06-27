import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";

const NewCollection = () => {
  const [newCollections, setNewCollections] = useState([]);

  const fetchNewCollections = async () => {
    try {
      const response = await fetch("http://localhost:4000/newcollection");
      const data = await response.json();
      setNewCollections(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewCollections();
  }, []);

  return (
    <div className="newCollections">
      <h1 id="newcollectionh1">New Collections</h1>
      <div className="collections">
        {newCollections.map((item, i) => {
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

export default NewCollection;
