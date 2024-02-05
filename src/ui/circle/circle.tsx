import React from "react";
import styles from "./circle.module.css";
import { ElementStates } from "../../utils/constants";

interface CircleProps {
  state?: ElementStates;
  value?: string;
  above?: string | React.ReactElement | null;
  index?: number;
  below?: string | React.ReactElement | null;
  belowType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  state = ElementStates.Default,
  value,
  above,
  index,
  below,
  extraClass = "",
  isSmall,
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`}>
      <div
        className={`text text_type_input text_color_input mb-4 ${
          styles.absolute
        } ${styles.above} ${
          styles[typeof above === "string" ? "string" : "element"]
        }`}
      >
        {above}
      </div>
      <div
        className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
          styles[state]
        }`}
      >
        <p
          className={`text text_type_circle text_color_input ${styles.value}`}
        >
          {value}
        </p>
      </div>
      <p
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
      >
        {index?.toString()}
      </p>
      <div
        className={`text text_type_input text_color_input mt-4 ${
          styles.absolute
        } ${index?.toString() ? styles.below60 : styles.below30} ${
          styles[typeof below === "string" ? "string" : "element"]
        }`}
      >
        {below}
      </div>
    </div>
  );
};
