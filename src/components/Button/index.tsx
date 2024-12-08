import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { ButtonProps } from "../../types";

const Button = ({ children, to, onClick }: ButtonProps) => {
  if (to) {
    return (
      <NavLink className={styles.button} to={to} aria-label="Go to login page">
        {children}
      </NavLink>
    );
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
