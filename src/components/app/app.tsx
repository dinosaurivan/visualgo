import { BrowserRouter, Route, Switch } from "react-router-dom";
import { 
  ListPage,
  MainPage,
  QueuePage,
  StackPage,
  StringPage,
  SortingPage,
  FibonacciPage
} from "../../pages";

import "./app.css";

function App() {
  return (
    <div className="app">
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
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
