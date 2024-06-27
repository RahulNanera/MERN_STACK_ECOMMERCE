import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/Breadcrums/Breadcrums";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

function Product() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/get-product-details",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetch product details failed:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
}

export default Product;
