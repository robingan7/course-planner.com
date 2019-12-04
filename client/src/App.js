import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import LoginSignup from "./components/login-signup.component";
import Notfound from "./components/404.component";
import Planner from "./components/planner.component";
import { baseUrl } from "./data/constants"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLogin: {}
    }
    this.setCurrentLogin = this.setCurrentLogin.bind(this);
  }

  setCurrentLogin(user) {
    this.setState({ currentLogin: user});
  }

  render() {
    const { currentLogin } = this.state;

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={() => <LoginSignup serverLink={baseUrl} currentLogin={currentLogin} 
            setCurrentLogin={this.setCurrentLogin}
          />} />
          <Route path="/planner" component={() => <Planner serverLink={baseUrl} currentLogin={currentLogin}
            setCurrentLogin={this.setCurrentLogin}
          />} />
          <Route path="/404" component={Notfound} />
          <Redirect exact from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}