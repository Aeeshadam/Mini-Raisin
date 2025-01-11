import React from "react";
import styles from "./style.module.css";
import { footerLinks } from "../../constants";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumns}>
        {footerLinks?.map(({ id, links }) => (
          <ul className={styles.footerUl} key={id}>
            {links?.map(({ id, title: linkText, url }) => (
              <li key={id} className={styles.footerLi}>
                <a
                  href={url}
                  aria-label={linkText}
                  className={styles.footerLinksAnchor}
                >
                  {linkText}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className={styles.footerParagraph}>
        &copy; {thisYear} Invest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
