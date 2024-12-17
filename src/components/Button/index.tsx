import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  onClick,
  className,
  type = "button",
}) => {
  const classNames = `${styles.button} ${className ? styles[className] : ""}`;
  if (to) {
    return (
      <NavLink className={classNames} to={to} aria-label="Go to page">
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={classNames}
      onClick={onClick}
      type={type}
      aria-label="Button"
    >
      {children}
    </button>
  );
};

export default Button;
