import { useDashboard } from "../../contexts/DashboardContext";
import Accordion from "../../components/Accordion";
import styles from "./style.module.css";

const ClosedDeposits = () => {
  const { closedDeposits } = useDashboard();
  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.sectionHeading}>Closed Deposits</h3>
      {closedDeposits?.map((product) => (
        <Accordion key={product.id} productId={product.id} isActive={false} />
      ))}
    </section>
  );
};

export default ClosedDeposits;
