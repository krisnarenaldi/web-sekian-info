import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} Station2 Info. All rights reserved.</p>
                </div>
                <div className={styles.socialLinks}>
                    <a
                        href="https://www.linkedin.com/in/krisna-renaldi-9b739b29/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="https://twitter.com/krisnarenaldi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="X (Twitter)"
                    >
                        <FaXTwitter size={20} />
                    </a>
                    <a
                        href="https://github.com/krisnarenaldi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label="GitHub"
                    >
                        <FaGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
