import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import useAuth from "../../hooks/useAuth";
import LogInButton from "./LogInButton";

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
          className={styles.menu}
          onClick={handleMenuClick}
          aria-label="Menu Toggle"
        >
          <img src="/menu.svg" alt="Menu-icon" />
        </button>
      </div>

      <div
        className={`${styles.rightContainer} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
      >
        <ul className={styles.navLinks} role="menu">
          <li key="home" role="menuitem">
            <NavLink
              onClick={handleNavLinkClick}
              to={"/"}
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Home
            </NavLink>
          </li>

          {user && (
            <li key="dashboard" role="menuitem">
              <NavLink
                onClick={handleNavLinkClick}
                to={"/dashboard"}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
        <LogInButton />
      </div>
    </nav>
  );
};
export default Navbar;
