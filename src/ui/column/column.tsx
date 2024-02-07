import React from "react";
import styles from "./column.module.css";
import { ElementColors } from "../../utils/constants";

interface ColumnProps {
  value: number;
  color?: ElementColors;
  extraClass?: string;
}

export const Column: React.FC<ColumnProps> = ({
  value,
  color = ElementColors.Default,
  extraClass = "",
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[color]}`}
      style={{ height: (320 * value) / 100 || 1 }}
    />
    <p className={`text text_type_column text_color_input mt-3`}>{value}</p>
  </div>
);
