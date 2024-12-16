import React from "react";
import styles from "./style.module.css";
import Accordion from "./Accordion";
import { DashboardProduct } from "../../types";
import { CloseDepositProvider } from "../../contexts/CloseDepositContext";

interface ProductSectionsProps {
  title: string;
  products: DashboardProduct[];
  isActive: boolean;
}

const ProductSections: React.FC<ProductSectionsProps> = ({
  title,
  products,
  isActive,
}) => {
  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.sectionHeading}>{title}</h3>
      {products.map((product) => (
        <CloseDepositProvider key={product.id} product={product}>
          <Accordion product={product} isActive={isActive} />
        </CloseDepositProvider>
      ))}
    </section>
  );
};
export default ProductSections;
