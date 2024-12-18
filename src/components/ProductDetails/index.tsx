import React from "react";
import { Product, DashboardProduct } from "../../types";
import styles from "./style.module.css";
import { formatCurrency, formatPercentage } from "../../utils/utils";
import DetailItem from "./DetailItem";

interface ProductDetailsProps {
  product: Product | DashboardProduct;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
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

      {"interestEarned" in product && (
        <DetailItem
          label="Interest Earned"
          value={formatCurrency(product.interestEarned)}
        />
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
