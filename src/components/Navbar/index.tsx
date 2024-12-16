import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import LogInButton from "./LogInButton";
import { getInitials } from "../../utils/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleMenuClick = () => setIsMenuOpen((prevState) => !prevState);
  const handleNavLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logoAndMenuContainer}>
        <a className={styles.logo} href="/" aria-label="Logo">
          <img src="/logo.png" alt="Logo" />
        </a>

        <img
          role="button"
          onClick={handleMenuClick}
          className={styles.menuButton}
          src="/menu.svg"
          alt="menuButton"
        />
      </div>
      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        <NavLink to="/" className={styles.navLink} onClick={handleNavLinkClick}>
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/dashboard"
            className={styles.navLink}
            onClick={handleNavLinkClick}
          >
            Dashboard
          </NavLink>
        )}
        <LogInButton />
        {user && (
          <div className={styles.userInitials}>
            {getInitials(user.displayName || "")}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
