import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Accordion from "../../components/Accordion";
import { CloseDepositProvider } from "../../contexts/CloseDepositContext";
import styles from "./style.module.css";

const ActiveDeposits = () => {
  const activeProducts = useSelector(
    (state: RootState) => state.activeDeposits.activeDeposits
  );
  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.sectionHeading}>Active Deposits</h3>
      {activeProducts?.map((product) => (
        <CloseDepositProvider key={product.id} product={product}>
          <Accordion productId={product.id} isActive={true} />
        </CloseDepositProvider>
      ))}
    </section>
  );
};

export default ActiveDeposits;
