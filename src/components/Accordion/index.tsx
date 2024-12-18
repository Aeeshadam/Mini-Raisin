import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DashboardProduct } from "../../types";
import Button from "../Button";
import styles from "./style.module.css";
import { formatCurrency } from "../../utils/utils";
import ProductDetails from "../ProductDetails";
import { useCloseDeposit } from "../../contexts/CloseDepositContext";

interface AccordionProps {
  productId: string;
  isActive: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ productId, isActive }) => {
  const product = useSelector((state: RootState) =>
    isActive
      ? state.activeDeposits.activeDeposits.find((p) => p.id === productId)
      : state.closedDeposits.closedDeposits.find((p) => p.id === productId)
  ) as DashboardProduct;

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => setIsOpen((prev) => !prev);
  const { handleCloseDeposit } = useCloseDeposit();

  if (!product) return null;

  return (
    <article className={styles.accordion}>
      <div className={styles.accordionItemTop}>
        <div className={styles.logoAndNameContainer}>
          <img
            src={product.logo}
            alt={`${product.name} brand logo`}
            className={styles.accordionLogo}
          />
          <span>{product.name}</span>
        </div>
        <h3 className={styles.balance}>{formatCurrency(product.balance)}</h3>
      </div>
      <div className={styles.accordionItemBottom}>
        <Button
          onClick={toggleAccordion}
          className="link"
          aria-expanded={isOpen}
        >
          Details
        </Button>

        {isActive && (
          <Button className="outlined" onClick={handleCloseDeposit}>
            Close Deposit
          </Button>
        )}
      </div>

      {isOpen && <ProductDetails product={product} />}
    </article>
  );
};

export default Accordion;
