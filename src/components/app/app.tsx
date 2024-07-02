// libraries 
import React, { JSX } from "react";

// components 
import { AppRouter } from "..";

// styles
import styles from "./app.module.css";



export default function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  );
};
