import React from "react";
import { Product, DashboardProduct } from "../../types";
import styles from "./style.module.css";
import {
  formatCurrency,
  formatPercentage,
  calculateInterestEarned,
} from "../../utils/utils";
import DetailItem from "./DetailItem";

interface ProductDetailsProps {
  product: Product | DashboardProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const interest: number | undefined =
    "interestEarned" in product
      ? product.interestEarned
      : "startDate" in product && typeof product.balance === "number"
      ? calculateInterestEarned(
          product.balance,
          product.interestRate,
          product.startDate
        )
      : undefined;

  return (
    <div className={styles.productDetails}>
      <DetailItem label="Term" value={product.term} />

      <DetailItem
        label="Interest Rate"
        value={formatPercentage(product.interestRate)}
      />

      <DetailItem
        label="Minimum Deposit"
        value={formatCurrency(product.minimumDeposit)}
      />

      <DetailItem
        label="Maximum Deposit"
        value={formatCurrency(product.maximumDeposit)}
      />

      {"balance" in product && (
        <DetailItem label="Balance" value={formatCurrency(product.balance)} />
      )}
      {interest !== undefined && (
        <DetailItem label="Interest Earned" value={formatCurrency(interest)} />
      )}
      {"startDate" in product && (
        <DetailItem label="Start Date" value={product.startDate} />
      )}
      {"closedDate" in product && (
        <DetailItem label="Closed Date" value={product.closedDate} />
      )}
    </div>
  );
};

export default ProductDetails;
