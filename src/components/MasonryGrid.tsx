import React from "react";
import styles from "./MasonryGrid.module.css";

interface MasonryGridProps {
  children: React.ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  return (
    <div className={styles.grid}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const className =
          (child as React.ReactElement<{ className?: string }>).props
            ?.className || "";

        const isSpanAll = className.includes("span-all");
        const isSpan3 = className.includes("span-3");
        const isSpan2 = className.includes("span-2");
        const isRowSpan3 = className.includes("row-span-3");
        const isRowSpan2 = className.includes("row-span-2");

        let itemClass = "";
        if (isSpanAll) itemClass += ` ${styles.spanAll}`;
        if (isSpan3) itemClass += ` ${styles.span3}`;
        if (isSpan2) itemClass += ` ${styles.span2}`;
        if (isRowSpan3) itemClass += ` ${styles.rowSpan3}`;
        if (isRowSpan2) itemClass += ` ${styles.rowSpan2}`;

        return <div className={itemClass}>{child}</div>;
      })}
    </div>
  );
};

export default MasonryGrid;
