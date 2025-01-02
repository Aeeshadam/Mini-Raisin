import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductDetails from "../../components/ProductDetails";
import { ApplyFormProvider } from "../../contexts/ApplyContext";
import ApplyForm from "./ApplyForm";
import { Product } from "../../types";
import styles from "./style.module.css";

const typedProducts: Product[] = products;

const Apply = () => {
  const { productId } = useParams<{ productId: string }>();

  const product = typedProducts.find(
    (product: Product) => product.id === productId
  );

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main className={styles.apply}>
      <h2>Your savings account choice</h2>
      <div className={styles.logoAndNameContainer}>
        <img src={product.logo} alt={`${product.name} logo`} />
        <h4>{product.name}</h4>
      </div>
      <ProductDetails product={product} />
      <ApplyFormProvider product={product}>
        <ApplyForm />
      </ApplyFormProvider>
    </main>
  );
};

export default Apply;
