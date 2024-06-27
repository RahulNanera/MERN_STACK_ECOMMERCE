import React, { createContext, useEffect, useState } from "react";
import all_product_data from "../components/assets/all_product";

export const ShopContext = createContext(null);

const defaultCart = () => {
  let cart = {};
  return cart;
};

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(defaultCart);
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

  const fetchCartData = async () => {
    try {
      if (localStorage.getItem("auth-token")) {
        const response = await fetch("http://localhost:4000/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        });
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNewProducts();
    fetchCartData();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) - 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromthecart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const contextValue = {
    all_product_data,
    newProducts,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
