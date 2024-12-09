import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { ButtonProps } from "../../types";

const Button = ({ children, to, onClick, classname }: ButtonProps) => {
  const classNames = `${styles.button} ${classname ? styles[classname] : ""}`;
  if (to) {
    return (
      <NavLink className={classNames} to={to} aria-label="Go to login page">
        {children}
      </NavLink>
    );
  }

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
