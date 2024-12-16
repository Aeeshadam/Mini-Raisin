import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { useAuth } from "../../contexts/AuthContext";
import LogInButton from "./LogInButton";
import { getInitials } from "../../utils";

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
        <button
          className={styles.menuButton}
          onClick={handleMenuClick}
          aria-label="Menu"
        >
          ☰
        </button>
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
