import React, { useState } from "react";
import styles from "./style.module.css";
import { navLinks } from "../../../constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
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
      <ul
        className={`${styles.navLinks} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
        role="menu"
      >
        {Array.isArray(navLinks) &&
          navLinks.length > 0 &&
          navLinks.map((link) => (
            <li key={link.id} role="menuitem">
              <a href={link.href} onClick={handleLinkClick}>
                {link.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};
export default Navbar;
