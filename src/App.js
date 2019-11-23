import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import LoginSignup from "./components/login-signup.component";
import Notfound from "./components/404.component";
import Planner from "./components/planner.component";

const baseUrl = "http://localhost:5000";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <LoginSignup serverLink={baseUrl}/>} />
        <Route path="/planner" component={() => <Planner serverLink={baseUrl}/>} />
        <Route path="/404" component={Notfound} />
        <Redirect exact from="*" to="/404" />
      </Switch>
    </Router>
  );
}

export default App;