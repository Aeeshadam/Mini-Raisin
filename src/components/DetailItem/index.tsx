import { FC } from "react";
import styles from "./style.module.css";

const DetailItem: FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className={styles.detailItem}>
    <h4>{label}:</h4>
    <p>{value}</p>
  </div>
);

export default DetailItem;
