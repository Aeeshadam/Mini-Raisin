import React from "react";
import styles from "./style.module.css";
import { formatCurrency } from "../../utils";
import { DashboardProduct } from "../../types";
import ProductSections from "./ProductSections";

interface DashboardProps {
  activeProducts: DashboardProduct[];
  closedProducts: DashboardProduct[];
}

const Dashboard: React.FC<DashboardProps> = ({
  activeProducts,
  closedProducts,
}) => {
  const totalInvested = activeProducts.reduce(
    (sum, product) => sum + product.balance,
    0
  );

  const hasActiveProducts = activeProducts.length > 0;
  const hasClosedProducts = closedProducts.length > 0;

  if (!hasActiveProducts && !hasClosedProducts) {
    return <h2>You have no deposits</h2>;
  }

  return (
    <main className={styles.dashboard}>
      {hasActiveProducts && (
        <>
          <h2 className={styles.totalBalance}>
            Total Invested: {formatCurrency(totalInvested)}
          </h2>
          <ProductSections
            title="Active Products"
            products={activeProducts}
            isActive={true}
          />
        </>
      )}

      {hasClosedProducts && (
        <ProductSections
          title="Closed Deposits"
          products={closedProducts}
          isActive={false}
        />
      )}
    </main>
  );
};

export default Dashboard;
