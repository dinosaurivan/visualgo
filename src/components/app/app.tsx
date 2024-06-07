// components 
import { AppRouter } from "../../components";

// styles
import styles from "./app.module.css";



export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  );
};
