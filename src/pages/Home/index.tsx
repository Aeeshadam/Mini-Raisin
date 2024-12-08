import React from "react";
import Hero from "./Hero";
import styles from "./Hero/style.module.css";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className={styles.heroSpacer}></div>
    </div>
  );
};
export default Home;
