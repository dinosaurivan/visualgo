import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  MainPage,
  QueuePage,
  StackPage,
  StringPage,
  SortingPage,
  FibonacciPage,
  LinkedListPage,
} from "../../pages";

import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/string" element={<StringPage />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/list" element={<LinkedListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
