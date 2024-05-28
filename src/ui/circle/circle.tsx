import React from "react";
import styles from "./circle.module.css";
import { ElementColors } from "../../utils/constants";

interface CircleProps {
  color?: ElementColors;
  value?: string;
  above?: string | React.ReactElement | null;
  index?: number;
  below?: string | React.ReactElement | null;
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  color = ElementColors.Default,
  value,
  above,
  index,
  below,
  extraClass = "",
  isSmall,
}) => {
  return (
    <div 
      data-testid="circle"
      className={`${styles.content} ${extraClass}`} 
    >
      <div
        data-testid="above"
        className={`text text_type_input text_color_input mb-4 ${
          styles.above
        } ${
          styles.absolute
        } ${
          styles[typeof above === "string" ? "string" : "element"]
        }`}
      >
        {above}
      </div>
      <div
        data-testid="inside"
        className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
          styles[color]
        }`}
      >
        <p
          className={`text text_type_circle text_color_input ${styles.value}`}
        >
          {value}
        </p>
      </div>
      <p
        data-testid="index"
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
      >
        {index?.toString()}
      </p>
      <div
        data-testid="below"
        className={`text text_type_input text_color_input mt-4 ${
          index?.toString() ? styles.below60 : styles.below30
        } ${
          styles.absolute
        } ${
          styles[typeof below === "string" ? "string" : "element"]
        }`}
      >
        {below}
      </div>
    </div>
  );
};
