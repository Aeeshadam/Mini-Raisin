import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { navLinks } from "../../constants";
import Button from "../Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

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
        className={` ${styles.rightContainer} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
      >
        <ul className={styles.navLinks} role="menu">
          {Array.isArray(navLinks) &&
            navLinks.map((link) => (
              <li key={link.id} role="menuitem">
                <NavLink
                  onClick={handleNavLinkClick}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : ""
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
        </ul>
        <Button to="/login">Log in</Button>
      </div>
    </nav>
  );
};
export default Navbar;
