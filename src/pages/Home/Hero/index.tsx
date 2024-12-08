import React from "react";
import Button from "../../../components/Button";
import styles from "./style.module.css";

const Hero = () => {
  return (
    <header className={styles.heroContainer}>
      <div className={styles.hero} aria-label="background-image"></div>
      <div className={styles.heroOverlay}></div>
      <section className={styles.heroContent}>
        <h1>Maximize Your Savings with Secure Investment Accounts</h1>
        <p className={styles.heroDescription}>
          Explore high-yield savings accounts tailored to your financial goals.
          Secure, flexible, and rewarding.
        </p>

        <Button to="/login">Get Started</Button>
      </section>
    </header>
  );
};
export default Hero;
