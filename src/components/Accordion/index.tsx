import React, { useState } from "react";
import { DashboardProduct } from "../../types";
import Button from "../Button";
import styles from "./style.module.css";
import { formatCurrency, formatPercentage } from "../../utils";

interface AccordionProps {
  product: DashboardProduct;
}

const Accordion: React.FC<AccordionProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleAccordion = () => setIsOpen((prev) => !prev);

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
      </div>

      {isOpen && (
        <div className={styles.expanded}>
          <div>
            <h4>Term:</h4>
            <p>{product.term}</p>
          </div>

          <div>
            <h4>Interest Rate:</h4>
            <p>{formatPercentage(product.interestRate)}</p>
          </div>

          <div>
            <h4>Minimum Deposit:</h4>
            <p>{formatCurrency(product.minimumDeposit)}</p>
          </div>

          <div>
            <h4>Maximum Deposit:</h4>
            <p>{formatCurrency(product.maximumDeposit)}</p>
          </div>

          <div>
            <h4>Start Date:</h4>
            <p>{product.startDate}</p>
          </div>

          {product.closedDate && (
            <div>
              <h4>Closed Date:</h4>
              <p>{product.closedDate}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Accordion;
