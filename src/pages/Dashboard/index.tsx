import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { formatCurrency } from "../../utils/utils";
import { DashboardProduct } from "../../types";
import ProductSections from "./ProductSections";
import styles from "./style.module.css";

interface DashboardProps {
  activeProducts: DashboardProduct[];
  closedProducts: DashboardProduct[];
}

const Dashboard: React.FC<DashboardProps> = ({
  activeProducts,
  closedProducts,
}) => {
  const loading = useSelector(
    (state: RootState) => state.activeDeposits.loading
  );
  const totalInvested = activeProducts.reduce(
    (sum, product) => sum + product.balance,
    0
  );

  const hasActiveProducts = activeProducts.length > 0;
  const hasClosedProducts = closedProducts.length > 0;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!hasActiveProducts && !hasClosedProducts) {
    return <h2>No products found</h2>;
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
