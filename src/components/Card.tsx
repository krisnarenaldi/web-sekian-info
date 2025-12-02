import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footerButtonText?: string;
  footerButtonLink?: string;
  footerNote?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  footerButtonText,
  footerButtonLink,
  footerNote,
  className,
  style,
}) => {
  return (
    <div className={`${styles.card} ${className || ""}`} style={style}>
      {title && (
        <div className={styles.title}>
          {icon && <span>{icon}</span>}
          {title}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footerButtonText && (
        <div className={styles.footer}>
          {footerButtonLink ? (
            <a
              href={footerButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              {footerButtonText}
            </a>
          ) : (
            <button className={styles.button}>{footerButtonText}</button>
          )}
        </div>
      )}
      {footerNote && (
        <div
          style={{
            fontSize: "0.75rem",
            fontStyle: "italic",
            opacity: 0.7,
            textAlign: "center",
            padding: "8px 0 4px 0",
          }}
        >
          {footerNote}
        </div>
      )}
    </div>
  );
};

export default Card;
