import React, { Component } from 'react';
import axios from "axios";
import GoogleLogin from "react-google-login";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default class LoginSignup extends Component {
    constructor(props) {
      super(props);
      this.onChangeForm = this.onChangeForm.bind(this);
      this.onLogin = this.onLogin.bind(this);
      this.onSignup = this.onSignup.bind(this);
      this.onSignupHelper = this.onSignupHelper.bind(this);
      this.onLoginHelper = this.onLoginHelper.bind(this);
      this.responseGoogleSignup = this.responseGoogleSignup.bind(this);
      this.responseGoogleLogin = this.responseGoogleLogin.bind(this);
      this.redirectToPlanner = this.redirectToPlanner.bind(this);
      this.state = {
        usernameSignup: "",
        emailSignup: "",
        passwordSignup: "",
        passwordLogin: "",
        emailLogin: "",
        loginError: "",
        signupError: "",
        signInBtnText: "sign in",
        signUpBtnText: "sign up"
      };
    }

    onChangeForm(e) {
      const { target: { name, value } } = e
      this.setState({
        [name]: value
      });
    }

    onLoginHelper(user, isGoogle) {
      this.setState({ signInBtnText : "logging in"});
      let googlePostfix = "";
      if (isGoogle) {
        googlePostfix = "-google";
      }

      axios
        .post(
          this.props.serverLink + "/signup-login/login" + googlePostfix,
          user
        )
        .then(res => {
          let message = res.data.message;
          if (message != "The username and password combination is correct!") {
            this.setState({ loginError: message });
            document.getElementById("loginError").classList.add("formError");
          } else {
            this.setState({ loginError: "" });
            document.getElementById("loginError").classList.remove("formError");
            if (!isGoogle) {
              this.setState({
                passwordLogin: "",
                emailLogin: ""
              });
            }
            this.redirectToPlanner(res.data.info);
          }

          this.setState({ signInBtnText: "sign in" });
        })
        .catch(err => {
          this.setState({ signInBtnText: "sign in" });
          console.log(err);
        });;
    }

    onLogin(e) {
      e.preventDefault();

      const user = {
          email: this.state.emailLogin,
          password: this.state.passwordLogin
      };

      this.onLoginHelper(user, false);
    }

    onSignupHelper(user, isGoogle){
      this.setState({ signUpBtnText : "signing up"});

      let googlePostfix = "";
      if (isGoogle) {
        googlePostfix = "-google";
      }

      axios
        .post(this.props.serverLink + "/signup-login/signup" + googlePostfix, user)
        .then(res => {
          console.log(res.data.info);
          let message = res.data.message;
          if (message != "Sign up successfully!!") {
            this.setState({ signupError: message });
            document.getElementById("signupError").classList.add("formError");
            if(message == "Email already exists" && isGoogle) {
              this.redirectToPlanner(res.data.info);
            }
          } else {
            this.setState({ signupError: "" });
            document.getElementById("signupError").classList.remove("formError");
            this.setState({
              usernameSignup: "",
              emailSignup: "",
              passwordSignup: ""
            });
            this.redirectToPlanner(res.data.info);
          }
          this.setState({ signUpBtnText: "sign up" });

        })
        .catch(err => {
          this.setState({ signUpBtnText: "sign up" });
          console.log(err);
        });
    }

    UNSAFE_componentWillMount(){
      if(cookies.get("cp__id") != undefined && cookies.get("cp_email") != undefined){
        window.location = "/planner";
      }
    }

    onSignup(e) {
      e.preventDefault();

      const user = {
          username: this.state.usernameSignup,
          email: this.state.emailSignup,
          password: this.state.passwordSignup,
          loginType: "normal",
          date: new Date()
      };

      this.onSignupHelper(user, false);
    }

    responseGoogleSignup(res) {
      const user = {
        username: res.profileObj.name,
        email: res.profileObj.email,
        googleId: res.profileObj.googleId,
        imageUrl: res.profileObj.imageUrl,
        loginType: "google",
        date: new Date()
      };

      this.onSignupHelper(user, true);
      //this.signup(response, 'google');
    }

    responseGoogleLogin(res){
      const user = {
        email: res.profileObj.email
      };

      this.onLoginHelper(user, true);
    }

    redirectToPlanner(input_user){
      for (let [key, value] of Object.entries(input_user)) {
          cookies.set("cp_" + key, value);
      }
      window.location = "/planner";
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
                    <GoogleLogin
                      clientId="301626662504-9hvlkq8e1nkf4er84avjvv0ehvkifggo.apps.googleusercontent.com"
                      buttonText="Signup with Google"
                      onSuccess={this.responseGoogleSignup}
                      onFailure={this.responseGoogleSignup}
                      className="googleAuth"
                    />
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
                  <button>{this.state.signUpBtnText}</button>
                  <div id="signupError">{this.state.signupError}</div>
                </form>
              </div>
              <div className="form-container sign-in-container">
                <form onSubmit={this.onLogin}>
                  <h1>Sign in</h1>
                  <div className="social-container">
                    <GoogleLogin
                      clientId="301626662504-9hvlkq8e1nkf4er84avjvv0ehvkifggo.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={this.responseGoogleLogin}
                      onFailure={this.responseGoogleLogin}
                      className="googleAuth"
                    />
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
                  <a className="forgetpassword" href="mailto:gzt11111@gmail.com?subject=Recover password for {your email}&body=Thanks">
                    Forgot your password?
                  </a>
                  <button>{this.state.signInBtnText}</button>
                  <div id="loginError">{this.state.loginError}</div>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button id="signInBtn" className="ghost" id="signIn">
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