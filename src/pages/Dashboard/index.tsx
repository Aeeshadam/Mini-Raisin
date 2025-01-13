import { useMemo } from "react";
import { useSelector } from "react-redux";
import { DashboardProvider } from "../../contexts/DasboardContext";
import { RootState } from "../../store/store";
import ActiveDeposits from "./ActiveDeposits";
import CloseDeposits from "./ClosedDeposits";
import { formatCurrency } from "../../utils";
import styles from "./style.module.css";

const Dashboard = () => {
  const activeProducts = useSelector(
    (state: RootState) => state.activeDeposits.activeDeposits
  );
  const closedProducts = useSelector(
    (state: RootState) => state.closedDeposits.closedDeposits
  );
  const loading = useSelector(
    (state: RootState) => state.activeDeposits.loading
  );

  const totalInvested = useMemo(
    () => activeProducts.reduce((sum, product) => sum + product.balance, 0),
    [activeProducts]
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
    <DashboardProvider>
      <main className={styles.dashboard}>
        {hasActiveProducts && (
          <>
            <h2 className={styles.totalBalance}>
              Total Invested: {formatCurrency(totalInvested)}
            </h2>
            <ActiveDeposits />
          </>
        )}

        {hasClosedProducts && <CloseDeposits />}
      </main>
    </DashboardProvider>
  );
};

export default Dashboard;
