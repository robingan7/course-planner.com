import React, { Component } from 'react';
import axios from "axios";

export default class LoginSignup extends Component {
  constructor(props) {
    super(props);

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);

    this.state = {
      usernameSignup: "",
      emailSignup: "",
      passwordSignup: "",
      passwordLogin: "",
      emailLogin: "",
      loginError: "",
      signupError: ""
    };
  }

  onChangeForm(e) {
    const { target: { name, value } } = e
    this.setState({
      [name]: value
    });
  }

  onLogin(e) {
    e.preventDefault();

    const user = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin
    };

    axios
      .post(this.props.serverLink + "/signup-login/login", user)
      .then(res => {
          let message = res.data.message;
          if (message != "The username and password combination is correct!") {
            this.setState({ loginError: message });
            document.getElementById("loginError").classList.add("formError");
          } else {
            this.setState({ loginError: "" });
            document.getElementById("loginError").classList.remove("formError");
          }
        });

      /*
    this.setState({
      passwordLogin: "",
      emailLogin: ""
    });*/
  }

  onSignup(e) {
    e.preventDefault();

    const user = {
      username: this.state.usernameSignup,
      email: this.state.emailSignup,
      password: this.state.passwordSignup,
      date: new Date()
    };

    axios
      .post(this.props.serverLink + "/signup-login/signup", user)
      .then(res => {
          let message = res.data.message;
          if (message != "Sign up successfully!!") {
            this.setState({ signupError: message });
            document.getElementById("signupError").classList.add("formError");
          } else {
            this.setState({ signupError: "" });
            document.getElementById("signupError").classList.remove("formError");
          }
        })
      .catch(err => {

      });

      /*
    this.setState({
      usernameSignup: "",
      emailSignup: "",
      passwordSignup: ""
    });*/
  }

  render() {
    return (
      <div className="App">
        <img src="/logo512.png" alt="logo" className="titleImage" />
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={this.onSignup}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Username"
                name="usernameSignup"
                value={this.state.usernameSignup}
                onChange={this.onChangeForm}
              />
              <input
                type="email"
                placeholder="Email"
                name="emailSignup"
                value={this.state.emailSignup}
                onChange={this.onChangeForm}
              />
              <input
                type="password"
                placeholder="Password"
                name="passwordSignup"
                value={this.state.passwordSignup}
                onChange={this.onChangeForm}
              />
              <button>Sign Up</button>
              <div id="signupError">{this.state.signupError}</div>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={this.onLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                name="emailLogin"
                value={this.state.emailLogin}
                onChange={this.onChangeForm}
              />
              <input
                type="password"
                placeholder="Password"
                name="passwordLogin"
                value={this.state.passwordLogin}
                onChange={this.onChangeForm}
              />
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
              <div id="loginError">{this.state.loginError}</div>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Course Planner!!</h1>
                <p>hello! we can help you organize your classes</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}