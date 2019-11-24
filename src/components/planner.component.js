import React, { Component} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../Planner.css";
import Calendar from "./planner/calendar.component";
import Settings from "./planner/settings.component";
import Manage from "./planner/manage.component";
import Question from "./planner/question.component";
import Notification from "./planner/notification.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const cookies = new Cookies();

export default class Planner extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    this.currentViewNameChange = this.currentViewNameChange.bind(
      this
    );
    this.onChangeUpdate = this.onChangeUpdate.bind(this);
    this.onUpdateFromSettings = this.onUpdateFromSettings.bind(
      this
    );
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
    this.unChecked = this.unChecked.bind(this);
    this.doNothing = this.doNothing.bind(this);
    this.getAppointment = this.getAppointment.bind(this);

    this.state = {
      isChecked: false,
      id: "",
      email: "",
      name: "",
      googleId: "",
      imageUrl: "",
      currentDate: this.getCurrentDate(),
      currentViewName: "Month",
      mainResourceName: "period",
      resources: [],
      appointment: [],
      canEditEmail: true
    };

  }

  getAppointment(idInput){
   const user = {
     id: idInput
   };
    axios
      .post(this.props.serverLink + "/signup-login/getAppointment", user)
      .then(res => {
        if (res.data.message == "Got it!") {
          this.setState({
            appointment: res.data.schedule,
            resources: res.data.resources
          });
        }
      })
      .catch(err => {
        console.log("error in getAppointment()");
      });
  }
  unChecked() {
    this.setState({ isChecked: false });
  }
  toggleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  getCurrentDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  currentViewNameChange(changedName) {
    this.setState({ currentViewName: changedName });
  }

  signout() {
    let promise = new Promise((resolve, reject) => {
      let allCookies = cookies.getAll();
      for (let [key, value] of Object.entries(allCookies)) {
        if (key.indexOf("cp_") != -1) {
          cookies.remove(key);
          console.log(key);
        }
      }
      resolve();
    });

    promise.then(res => {
      window.location = "/";
    });
  }

  UNSAFE_componentWillMount() {
    let cp_id = cookies.get("cp__id");
    let cp_email = cookies.get("cp_email");
    if (cp_id == undefined || cp_email == undefined) {
      this.signout();
    } else {
      let allCookies = cookies.getAll();
      this.setState({
        id: allCookies.cp__id,
        email: allCookies.cp_email,
        type: allCookies.cp_loginType,
        name: allCookies.cp_username,
        imageUrl: "/logo192.png"
      });

      if (allCookies.cp_loginType == "google") {
        this.setState({
          googleId: allCookies.cp_googleId,
          canEditEmail: false,
          imageUrl: allCookies.cp_imageUrl
        });
      } else {
        this.setState({
          googleId: "",
          canEditEmail: true
        });
      }
      this.getAppointment(allCookies.cp__id);
    }
  }

  onChangeUpdate(e) {
    const {
      target: { name, value }
    } = e;

    this.setState({
      [name]: value
    });
    console.log({
      [name]: value
    });
  }

  onUpdateFromSettings(res) {
    this.setState({
      email: res.email,
      imageUrl: res.imageUrl,
      name: res.name
    });
  }

  doNothing(){}

  render() {
    const {
      name,
      email,
      imageUrl,
      id,
      canEditEmail,
      currentDate,
      currentViewName,
      appointment,
      isChecked
    } = this.state;
    return (
      <React.Fragment>
        <img
          src="/logo192.png"
          className="logoImg"
          alt="logoImg"
        />
        <input
          id="hamburger"
          onClick={this.toggleChecked}
          className="hamburger"
          type="checkbox"
          checked={isChecked}
          onChange={this.doNothing}
        />
        <label htmlFor="hamburger" className="hamburger">
          <i></i>
          <div>
            <div className="closeReplace"></div>
            <div className="openReplace"></div>
          </div>
        </label>
        <nav className="primnav">
          <ul>
            <li onClick={this.unChecked}>
              <Link title="Dashboard" to="/planner/dashboard">
                <i className="fas fa-calendar-alt icon"></i>{" "}
                Dashboard
              </Link>
            </li>
            <li onClick={this.unChecked}>
              <Link to="/planner/manage">
                <i className="fas fa-tasks icon"></i>Manage
                <div className="tag">24</div>
              </Link>
            </li>
            <li onClick={this.unChecked}>
              <Link
                title="Notification"
                to="/planner/notification"
              >
                <i className="fas fa-bell icon"></i>Notification
                <div className="tag">22</div>
              </Link>
            </li>
            <li onClick={this.unChecked}>
              <Link title="Question" to="/planner/question">
                <i className="fas fa-question-circle icon"></i>
                Question
              </Link>
            </li>
          </ul>
        </nav>

        <div className="userReplace" id="user">
          <section>
            <img src={this.state.imageUrl} />
            <section>
              <div className="nameReplace">
                {this.state.name}
              </div>
              <div className="actionsReplace">
                <Link
                  onClick={this.unChecked}
                  to="/planner/settings"
                >
                  settings
                </Link>{" "}
                |{" "}
                <a className="signout" onClick={this.signout}>
                  logout
                </a>
              </div>
            </section>
          </section>
        </div>

        <Switch>
          <Route
            path="/planner"
            exact
            component={() => (
              <Calendar
                appointments={appointment}
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                viewChange={this.currentViewNameChange}
              />
            )}
          />
          <Route
            path="/planner/settings"
            component={() => (
              <Settings
                username={name}
                imageUrl={imageUrl}
                email={email}
                canEditEmail={canEditEmail}
                id={id}
                serverLink={this.props.serverLink}
                sendUpdate={this.onUpdateFromSettings}
              />
            )}
          />
          <Route
            path="/planner/dashboard"
            component={() => (
              <Calendar
                appointments={appointment}
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                viewChange={this.currentViewNameChange}
              />
            )}
          />

          <Route
            path="/planner/manage"
            component={() => <Manage />}
          />

          <Route
            path="/planner/notification"
            component={() => <Notification />}
          />

          <Route
            path="/planner/question"
            component={() => <Question />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
