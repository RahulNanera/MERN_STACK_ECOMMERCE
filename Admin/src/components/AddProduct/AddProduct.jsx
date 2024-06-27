import React, { useState } from "react";
import "./AddProduct.css";
import uploadImg from "../../assets/upload_area.svg";

const AddProuduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductDetails({ ...productDetails, image: files[0] });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const AddProduct = async () => {
    if (
      !productDetails.name ||
      !productDetails.old_price ||
      !productDetails.new_price ||
      !productDetails.category ||
      !productDetails.image
    ) {
      alert("Please fill out all fields and select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product", productDetails.image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const productData = { ...productDetails, image: uploadData.image_url };

        const productResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );

        if (productResponse.ok) {
          alert("Successfully added product");
        } else {
          alert("Unsuccessful in adding product");
        }
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addProduct">
      <div className="productTitle">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="productOldPrice">
        <p>Old Price</p>
        <input
          value={productDetails.old_price}
          onChange={handleChange}
          type="number"
          name="old_price"
          placeholder="Type here"
        />
      </div>
      <div className="productNewPrice">
        <p>New Price</p>
        <input
          value={productDetails.new_price}
          onChange={handleChange}
          type="number"
          name="new_price"
          placeholder="Type here"
        />
      </div>
      <div className="productCategory">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleChange}
        >
          <option value="category">Category</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="productImg">
        <label htmlFor="input_Img">
          <img
            src={
              productDetails.image
                ? URL.createObjectURL(productDetails.image)
                : uploadImg
            }
            alt=""
          />
        </label>
        <input
          name="image"
          onChange={handleChange}
          type="file"
          id="input_Img"
          hidden
        />
      </div>
      <div className="addBtn">
        <button
          onClick={() => {
            AddProduct();
          }}
          id="adminAddProduct"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProuduct;
