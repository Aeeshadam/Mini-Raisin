import React from "react";
import Hero from "./Hero";
import OfferTable from "./OfferTable";

import styles from "./Hero/style.module.css";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.heroSpacer} aria-label="offset-hero"></div>
      <OfferTable />
    </div>
  );
};
export default Home;
