import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Accordion from "../../components/Accordion";
import { CloseDepositProvider } from "../../contexts/CloseDepositContext";
import styles from "./style.module.css";

const ClosedDeposits = () => {
  const closedDeposits = useSelector(
    (state: RootState) => state.closedDeposits.closedDeposits
  );
  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.sectionHeading}>Closed Deposits</h3>
      {closedDeposits.map((product) => (
        <CloseDepositProvider key={product.id} product={product}>
          <Accordion productId={product.id} isActive={false} />
        </CloseDepositProvider>
      ))}
    </section>
  );
};

export default ClosedDeposits;
