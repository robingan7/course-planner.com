import React, { Component} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../Planner.css";
import Calendar from "./calendar.component";
import Settings from "./settings.component";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";

const cookies = new Cookies();

export default class Planner extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    this.currentViewNameChange = this.currentViewNameChange.bind(this);
    this.onChangeUpdate = this.onChangeUpdate.bind(this);
    this.onUpdateFromSettings = this.onUpdateFromSettings.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);

    this.state = {
      id: "",
      email: "",
      name: "",
      googleId: "",
      imageUrl: "",
      currentDate: this.getCurrentDate(),
      currentViewName: "Month",
      appointment: [
        {
          startDate: "2019-10-31 10:00",
          endDate: "2019-10-31 11:00",
          title: "2.2"
        },
        {
          startDate: "2019-11-12 18:00",
          endDate: "2019-11-13 19:30",
          title: "2.3"
        }
      ],
      canEditEmail: true
    };
  }

  getCurrentDate(){
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

  onUpdateFromSettings(res){
    this.setState({
      email: res.email,
      imageUrl: res.imageUrl,
      name: res.name
    });
  }

  render() {
    const {
      name,
      email,
      imageUrl,
      id,
      canEditEmail,
      currentDate,
      currentViewName,
      appointment
    } = this.state;
    return (
      <React.Fragment>
        <input id="hamburger" className="hamburger" type="checkbox" />
        <label htmlFor="hamburger" className="hamburger">
          <i></i>
          <div>
            <div className="closeReplace"></div>
            <div className="openReplace"></div>
          </div>
        </label>
        <nav className="primnav">
          <ul>
            <li>
              <Link title="Dashboard" to="/planner/dashboard">
                <i className="fas fa-calendar-alt icon"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="">
                <i className="fas fa-tasks icon"></i>Manage
                <div className="tag">53</div>
              </Link>
              <ul className="secnav">
                <li>
                  <Link title="Plans" to="">
                    Plans
                  </Link>
                </li>
                <li>
                  <Link title="Blocks" to="">
                    Blocks
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link title="Notifications" to="">
                <i className="fas fa-bell icon"></i>Notifications
                <div className="tag">17</div>
              </Link>
            </li>
            <li>
              <Link title="Tool kit" to="">
                <i className="fas fa-toolbox icon"></i>Tool kit
              </Link>
              <ul className="secnav">
                <li>
                  <Link title="Add" to="">
                    Add
                  </Link>
                </li>
                <li>
                  <Link title="Import textbook" to="">
                    Import textbook
                  </Link>
                </li>
                <li>
                  <Link title="Delete" to="">
                    Delete
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="userReplace" id="user">
          <section>
            <img src={this.state.imageUrl} />
            <section>
              <div className="nameReplace">{this.state.name}</div>
              <div className="actionsReplace">
                <Link to="/planner/settings">settings</Link> |{" "}
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
        </Switch>
      </React.Fragment>
    );
  }
}
