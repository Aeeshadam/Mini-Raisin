import { ReactNode, FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  children,
  to,
  onClick,
  className,
  type = "button",
}) => {
  const classNames = `${styles.button} ${className ? styles[className] : ""}`;

  const renderIcon = () => {
    if (className === "googleButton") {
      return (
        <img
          src="/google.png"
          alt="google logo"
          className={styles.googleButtonImg}
        />
      );
    }
    return null;
  };

  if (to) {
    return (
      <NavLink className={classNames} to={to} aria-label="Go to page">
        {renderIcon()}
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
      {renderIcon()}
      {children}
    </button>
  );
};

export default Button;
