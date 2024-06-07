// libraries 
import React, { FC } from "react";

// components 
import { AppRouter } from "../../components";

// styles
import styles from "./app.module.css";



export const App: FC = () => {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  );
};
