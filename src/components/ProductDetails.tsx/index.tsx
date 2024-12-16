import React from "react";
import { Product, DashboardProduct } from "../../types";
import styles from "./style.module.css";
import { formatCurrency, formatPercentage } from "../../utils/utils";

interface ProductDetailsProps {
  product: Product | DashboardProduct;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className={styles.productDetails}>
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

      {"balance" in product && (
        <div>
          <h4>Balance:</h4>
          <p>{formatCurrency(product.balance)}</p>
        </div>
      )}

      {"interestEarned" in product && (
        <div>
          <h4>Interest Earned:</h4>
          <p>{formatCurrency(product.interestEarned)}</p>
        </div>
      )}

      {"startDate" in product && (
        <div>
          <h4>Start Date:</h4>
          <p>{product.startDate}</p>
        </div>
      )}

      {"closedDate" in product && (
        <div>
          <h4>Closed Date:</h4>
          <p>{product.closedDate}</p>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
