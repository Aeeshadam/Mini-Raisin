import React from "react";
import styles from "./style.module.css";

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className={styles.DetailItem}>
    <h4>{label}:</h4>
    <p>{value}</p>
  </div>
);

export default DetailItem;
