import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import LoginSignup from "./components/login-signup.component";
import Notfound from "./components/404.component";
import Planner from "./components/planner.component";
import { baseUrl } from "./data/constants"
import { ProtectedRoute } from "./components/protectedRoute";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={LoginSignup}
          />
          <ProtectedRoute
            path="/planner"
            component={Planner}
          />
          <Route path="/404" component={Notfound} />
          <Redirect exact from="*" to="/404" />
        </Switch>
      </BrowserRouter>
    );
  }
}