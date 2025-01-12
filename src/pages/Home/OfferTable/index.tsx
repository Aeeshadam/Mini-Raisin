import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext";
import { useAuth } from "../../../contexts/AuthContext";
import { Product } from "../../../types/types";
import products from "../../../data/products.json";
import styles from "./style.module.css";
import Button from "../../../components/Button";
import { formatCurrency, formatPercentage } from "../../../utils/utils";

const OfferTable = () => {
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = (productId: string) => {
    if (!user) {
      showNotification(
        "Please log in with google authentication to apply for a product",
        "info"
      );
    } else {
      navigate(`/apply/${productId}`);
    }
  };

  if (!products.length) {
    return <h2>No products found</h2>;
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
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td data-label="Interest Rate">
                <h2 className={styles.interest}>
                  {formatPercentage(product.interestRate)}
                </h2>
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
              <td data-label="Min Deposit">
                {formatCurrency(product.minimumDeposit)}
              </td>
              <td data-label="Max Deposit">
                {formatCurrency(product.maximumDeposit)}
              </td>
              <td>
                <Button
                  aria-label={`Apply for ${product.name}`}
                  onClick={() => handleApplyClick(product.id)}
                  className="outlined"
                >
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
