import React, { useState } from "react";
import GenToken from "./GenToken";
import Header from "./Header";
import CreateMsg from "./CreateMsg";
import DeleteMsg from "./DeleteMsg";
import ReadMsg from "./ReadMsg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);

  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Header home="1" />
            {token ? <Redirect to="/create" /> : <GenToken call={setToken} />}
          </Route>
          <Route exact path="/create">
            <Header home="2" />
            <CreateMsg token={token} />
          </Route>
          <Route exact path="/delete">
            <Header home="3" />
            <DeleteMsg token={token} />
          </Route>
          <Route exact path="/read">
            <Header home="0" />
            <ReadMsg />
          </Route>
          <Router path="*">
            <Redirect to="/" />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}
