import React, { useState } from "react";
import { DashboardProduct } from "../../../types";
import Button from "../../../components/Button";
import styles from "./style.module.css";
import { formatCurrency } from "../../../utils";
import ProductDetails from "../../../components/ProductDetails.tsx";
import { useCloseDeposit } from "../../../contexts/CloseDepositContext";

interface AccordionProps {
  product: DashboardProduct;
  isActive: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ product, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleAccordion = () => setIsOpen((prev) => !prev);
  const { handleCloseDeposit } = useCloseDeposit();
  if (!product) return null;

  return (
    <article className={styles.accordion}>
      <div className={styles.accordionItemTop}>
        <div className={styles.logoAndNameContainer}>
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            className={styles.accordionLogo}
          />
          <span>{product.name}</span>
        </div>
        <h3 className={styles.balance}>{formatCurrency(product.balance)}</h3>
      </div>
      <div className={styles.accordionItemBottom}>
        <Button onClick={handleToggleAccordion} className="link">
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
