
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

import { Header, Character } from "./container";

export const App = () => {
  return (
    <div className="root">
      <Router>
        <Header />
        <Switch>
          <Route path="/character/:id">
            <Character />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}