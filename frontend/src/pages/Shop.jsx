import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offer";
import NewCollection from "../components/NewCollections/NewCollection";
import Newslatter from "../components/Newslatter/Newslatter";

function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <Newslatter />
    </div>
  );
}

export default Shop;
