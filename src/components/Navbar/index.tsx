import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LogInButton from "./LogInButton";
import { getInitials } from "../../utils/utils";
import styles from "./style.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleMenuClick = () => setIsMenuOpen((prevState) => !prevState);
  const handleNavLinkClick = () => setIsMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logoAndMenuContainer}>
        <NavLink to="/" className={styles.logo} aria-label="Logo">
          <img src="/logo.png" alt="Logo" className={styles.logoImg} />
        </NavLink>

        <img
          role="button"
          onClick={handleMenuClick}
          className={styles.menuButton}
          src="/menu.svg"
          alt="menuButton"
        />
      </div>
      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
          to="/"
          onClick={handleNavLinkClick}
        >
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeLink : ""}`
            }
            onClick={handleNavLinkClick}
          >
            Dashboard
          </NavLink>
        )}
        <LogInButton />
        {user && (
          <div className={styles.userInitials} aria-label="name-initials">
            {getInitials(user.displayName || "")}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
