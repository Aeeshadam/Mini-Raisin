import React from "react";
import styles from "./style.module.css";
import { ButtonProps } from "../../types";

const Button = ({ children }: ButtonProps) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
