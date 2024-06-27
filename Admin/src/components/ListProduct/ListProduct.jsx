import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    await fetchInfo();
  };

  return (
    <div className="listProduct">
      <h1>All Products List</h1>
      <div className="mainContainer">
        <p id="p">Products</p>
        <p id="t">Title</p>
        <p id="o">Old Price</p>
        <p id="n">New Price</p>
        <p id="c">Category</p>
        <p id="r">Remove</p>
      </div>

      <hr />

      {allProducts.map((product, index) => {
        return (
          <div className="listproduct" key={index}>
            <img src={product.image} alt="error" id="productImg" />
            <p id="productname">{product.name}</p>
            <p id="productoldPrice">₹{product.old_price}</p>
            <p id="productnewPrice">₹{product.new_price}</p>
            <p id="productcategory">{product.category}</p>
            <img
              onClick={() => {
                remove_product(product.id);
              }}
              src={cross_icon}
              alt="error"
              id="removeImg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListProduct;
