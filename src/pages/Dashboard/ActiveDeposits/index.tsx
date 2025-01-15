import { useDashboard } from "../../../contexts/DashboardContext";
import Accordion from "../../../components/Accordion";
import styles from "../style.module.css";

const ActiveDeposits = () => {
  const { activeDeposits } = useDashboard();

  if (!activeDeposits) return null;
  return (
    <section className={styles.sectionContainer} data-testid="active-deposits">
      <h3 className={styles.sectionHeading}>Active Deposits</h3>
      {activeDeposits?.map((product) => (
        <Accordion key={product.id} productId={product.id} isActive={true} />
      ))}
    </section>
  );
};

export default ActiveDeposits;
