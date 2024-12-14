import React from "react";
import Hero from "./Hero";
import OfferTable from "./OfferTable";
import productData from "../../data/products.json";
import { Product } from "../../types";
import styles from "./Hero/style.module.css";

const products: Product[] = productData;
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
