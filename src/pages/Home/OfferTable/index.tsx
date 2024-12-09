import React from "react";
import { Product } from "../../../types";
import styles from "./style.module.css";
import Button from "../../../components/Button";

interface OfferTableProps {
  products: Product[];
}

const OfferTable: React.FC<OfferTableProps> = ({ products }) => {
  if (!products.length) {
    return <h2>No products available</h2>;
  }
  return (
    <>
      <h2 className={styles.offerTableHeading}>
        Choose from our wide range of Savings Accounts
      </h2>

      <table className={styles.offerTable}>
        <thead>
          <tr>
            <th data-label="Interest Rate">Interest Rate</th>
            <th data-label="Product">Product</th>
            <th data-label="Term">Term</th>
            <th data-label="Min Deposit">Min Deposit</th>
            <th data-label="Max Deposit">Max Deposit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td data-label="Interest Rate">
                <h2 className={styles.interest}>{product.interestRate}</h2>
              </td>
              <td data-label="Product">
                <div className={styles.logoContainer}>
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className={styles.logo}
                  />
                  {product.name}
                </div>
              </td>
              <td data-label="Term">{product.term}</td>
              <td data-label="Min Deposit">{product.minimumDeposit}</td>
              <td data-label="Max Deposit">{product.maximumDeposit}</td>
              <td>
                <Button to="/apply" classname="outlined">
                  Apply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OfferTable;
