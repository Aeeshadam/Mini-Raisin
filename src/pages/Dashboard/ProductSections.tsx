import React from "react";
import styles from "./style.module.css";
import Accordion from "../../components/Accordion";
import { DashboardProduct } from "../../types";

interface ProductSectionsProps {
  title: string;
  products: DashboardProduct[];
}

const ProductSections: React.FC<ProductSectionsProps> = ({
  title,
  products,
}) => {
  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.sectionHeading}>{title}</h3>
      {products.map((product) => (
        <Accordion key={product.id} product={product} />
      ))}
    </section>
  );
};
export default ProductSections;
