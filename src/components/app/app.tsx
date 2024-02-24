import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/string">
            <StringPage />
          </Route>
          <Route path="/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/sorting">
            <SortingPage />
          </Route>
          <Route path="/stack">
            <StackPage />
          </Route>
          <Route path="/queue">
            <QueuePage />
          </Route>
          <Route path="/list">
            <LinkedListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
