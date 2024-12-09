import React from "react";
import Hero from "./Hero";
import OfferTable from "./OfferTable";
import products from "../../products";
import styles from "./Hero/style.module.css";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.heroSpacer}></div>
      <OfferTable products={products} />
    </div>
  );
};
export default Home;
