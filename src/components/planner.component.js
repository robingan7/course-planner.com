import React, { Component, PureComponent} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "../Planner.css";
import Calendar from "./planner/calendar.component";
import Settings from "./planner/settings.component";
import Manage from "./planner/manage.component";
import Question from "./planner/question.component";
import Notification from "./planner/notification.component";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BLOCKS, MAX_NUM_OF_CLASSES} from "../data/schedules/smchs";
import Toast from "./planner/toast.component";
import { DEFAULT_STARTTIME, DEFAULT_ENDTIME, getCurrentDate, getNextDay, addDefaultTime} from "../data/constants";

const cookies = new Cookies();

export default class Planner extends PureComponent {
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
    this.toggleChecked = this.toggleChecked.bind(this);
    this.unChecked = this.unChecked.bind(this);
    this.doNothing = this.doNothing.bind(this);
    this.getAppointment = this.getAppointment.bind(this);
    this.appointFunc = this.appointFunc.bind(this);
    this.updateAppointmentsToMongo = this.updateAppointmentsToMongo.bind(this);
    this.updateImports = this.updateImports.bind(this);
    this.controlToast = this.controlToast.bind(this);

    this.state = {
      isChecked: false,
      id: "",
      email: "",
      name: "",
      googleId: "",
      imageUrl: "",
      currentDate: getCurrentDate(new Date()),
      currentViewName: "Month",
      mainResourceName: "period",
      resources: [{ "fieldName": "period", "title": "Period", "instances": [{ "id": "Default Class", "text": "Default Class" }, { "id": "Off", "text": "Off" }]}],
      textbooks:[],
      blocks:[],
      appointments: [],
      canEditEmail: true,
      toastOpen: false
    };
  }

  /* edit appointments methods */
  

  autoAdjust(editSchedule) {
    let resultList = [];
    let nextStartDay;

    for (let i = 0; i < editSchedule.length; i++) {
      let currentAppoint = editSchedule[i]
      let currentPeriod = currentAppoint.period;
      if (currentPeriod !== "Off"){
        let validDay;
        if(i === 0){
          validDay = this.getValidDay(currentAppoint.startDate,
            editSchedule, currentPeriod, resultList);
        } else {
          validDay = this.getValidDay(nextStartDay,
            editSchedule, currentPeriod, resultList);
        }
        
        nextStartDay = getCurrentDate(getNextDay(validDay)) + "T" + DEFAULT_STARTTIME;
        console.log(validDay, nextStartDay);
        currentAppoint.startDate = validDay;
        currentAppoint.endDate = validDay;
        resultList.push(Object.assign({}, addDefaultTime(currentAppoint)));
      } else {
        nextStartDay = getCurrentDate(getNextDay(new Date(currentAppoint.startDate))) + "T" + DEFAULT_STARTTIME;
        console.log(nextStartDay);
        resultList.push(Object.assign({}, currentAppoint));
      }
    }
    return resultList;
  }

  getValidDay(date, editSchedule, period, resultList) {
    if (!this.isONAnOffDay(date, editSchedule, period, resultList)) {
      return new Date(date);
    }
    let nextDay = getNextDay(new Date(date));
    return this.getValidDay(getCurrentDate(nextDay) + "T" + DEFAULT_STARTTIME,
      editSchedule, period, resultList);
  }

  isONAnOffDayHelper(date, editSchedule, period, resultList){
    for (let ele of resultList) {
      if (ele.startDate === date && (ele.period === "Off" || ele.period === period)) {
        return true;
      }
    }

    for (let ele of editSchedule) {
      if (ele.startDate === date && ele.period === "Off") {
        return true;
      }
      if (ele.startDate > date) {
        break;
      }
    }
    return false;
  }

  /**add for school schedule later */
  isONAnOffDay(date, editSchedule, period, resultList) {
    let helpReturn = this.isONAnOffDayHelper(date, editSchedule, period, resultList);
    if (!this.hasNumber(period)) {
      return  helpReturn || this.isOnOffDayOnSMCHS(date);
    } else {
      return helpReturn ||this.isOnOffDayOnSMCHS(date, Number(period.slice(-1)));
    }
  }

  isWeekEnd(date){
    let dateObj = new Date(date);
    return dateObj.getDay() == 0 || dateObj.getDay() == 6;
  }

  isOnOffDayOnSMCHS(date, period=undefined){
    let dayBlock = BLOCKS.block[date.split("T")[0]];
    if (dayBlock == undefined){
      return this.isWeekEnd(date);
    }
    if (dayBlock !== "Off"){
      if (period != undefined){
        let dayBlockName = dayBlock.substring(0, dayBlock.length - 1);
        let dayBlockNumber = Number(dayBlock.slice(-1));
        let currentBlocks = BLOCKS.sche[dayBlockName];
        let periodList = [];
        let addNum = 0;
        for (let [key, value] of Object.entries(currentBlocks)) {
          if (key.includes("Block") && !key.includes("/")){
            if (key.includes("8")){
              periodList.push(8);
            } else {
              let currentPeriod = dayBlockNumber + addNum;
              if (currentPeriod > MAX_NUM_OF_CLASSES){
                periodList.push(currentPeriod - MAX_NUM_OF_CLASSES);
              } else {
                periodList.push(currentPeriod);
              }
              addNum++;
            }
          }
        }
        return !periodList.includes((Number(period)));
      }
      return false;
    }
    return true;
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  getDuration(appoint) {
    let startDateNum = new Date(appoint.startDate).getDate();
    let endDateNum = new Date(appoint.endDate).getDate();

    return endDateNum - startDateNum;
  }

  getAddDayList(appoint) {
    let duration = this.getDuration(appoint);
    let startDate = new Date(appoint.startDate);
    
    if (duration !== 0) {
      let newDate = startDate;

      appoint.startDate = startDate;
      appoint.endDate = appoint.startDate;
      let result = [Object.assign({}, addDefaultTime(appoint))];
      for (let i = 0; i < duration; i++) {
        newDate = getNextDay(newDate);
        appoint.startDate = newDate;
        appoint.endDate = newDate;

        let clone = Object.assign({}, addDefaultTime(appoint));
        result.push(clone);
      }
      return result;
    }

    appoint.startDate = startDate;
    appoint.endDate = startDate;

    return [addDefaultTime(appoint)];
  }

  updateAppointmentsToMongo(appoint) {
    const user = {
      filter: {
        _id: this.state.id
      },
      update: {
        schedule: JSON.stringify(appoint)
      }
    };

    axios
      .post(this.props.serverLink + "/signup-login/update", user)
      .then(res => {
        const updated = JSON.parse(res.data.info.schedule);
        this.setState({ appointments: updated});
      })
      .catch(err => {
        console.log(err);
      });
  }

  sortPossibleAdjust(arr, isAutoAjd){
    arr.sort((a, b) => {
      if (a.startDate > b.startDate) {
        return 1;
      } else if (a.startDate < b.startDate) {
        return -1;
      }
      return 0;
    });

    if (isAutoAjd) {
      try {
        this.controlToast(true)
        return this.autoAdjust(arr);
      } catch (err) {
        console.log(err);
      }
    }
    
  }

  appointFunc(appoint, type, index=-1) {
    let copy = this.state.appointments;
    let finalArray;
    
    if(type === "add") {
      const dayList = this.getAddDayList(appoint);
      const isAutoAjd = dayList[0].isAutoAdjust;

      for (let ele of dayList) {
        copy.push(ele);
      }
      finalArray = this.sortPossibleAdjust(copy, isAutoAjd);
    } else if (type === "edit"){
      const dayList = this.getAddDayList(appoint);
      const isAutoAjd = dayList[0].isAutoAdjust;
      copy.splice(index, 1);

      for(let i = 0; i < dayList.length; i++) {
        copy.splice(index + i, 0, dayList[i]);
      }

      finalArray = this.sortPossibleAdjust(copy, isAutoAjd);
      
    } else if (type === "deleteSingle") {
      const isAutoAjd = appoint.isAutoAdjust;
      copy.splice(index, 1);

      finalArray = this.sortPossibleAdjust(copy, isAutoAjd);
      
    } else if (type === "delete"){
      if(index.length !== 0){
        const isAutoAjd = appoint.isAutoAdjust;
        copy = copy.filter((value, indexInArr, arr) => {
          return !index.includes(indexInArr);
        });

        finalArray = this.sortPossibleAdjust(copy, isAutoAjd);
      }
    } else if (type === "import"){
      const dayList = appoint;
      const isAutoAjd = dayList[0].isAutoAdjust;

      for (let ele of dayList) {
        copy.push(ele);
      }
      finalArray = this.sortPossibleAdjust(copy, isAutoAjd);
    }

    finalArray.sort((a, b) => {
      if (a.startDate > b.startDate) {
        return 1;
      } else if (a.startDate < b.startDate) {
        return -1;
      }
      return 0;
    });
    console.log(finalArray);
    //this.updateAppointmentsToMongo(finalArray);
  }

  /* ----------------- */

  updateImports(appoint) {
    const user = {
      filter: {
        _id: this.state.id
      },
      update: {
        blocks: JSON.stringify(appoint.blocks),
        textbooks: JSON.stringify(appoint.textbooks),
        resources: JSON.stringify(appoint.periods)
      }
    };

    axios
      .post(this.props.serverLink + "/signup-login/update", user)
      .then(res => {
        const updated = {
          blocks: JSON.parse(res.data.info.blocks),
          textbooks: JSON.parse(res.data.info.textbooks),
          resources: JSON.parse(res.data.info.resources)
        };

        this.setState(updated);
        this.controlToast(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  controlToast(b){
    this.setState({toastOpen: b});
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
            appointments: res.data.schedule,
            resources: res.data.resources,
            blocks: res.data.blocks,
            textbooks: res.data.textbooks
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

  currentViewNameChange(changedName) {
    this.setState({ currentViewName: changedName });
  }

  signout() {
    let promise = new Promise((resolve, reject) => {
      let allCookies = cookies.getAll();
      for (let [key, value] of Object.entries(allCookies)) {
        if (key.indexOf("cp_") != -1) {
          cookies.remove(key);
        }
      }
      resolve();
    });

    promise.then(res => {
      setTimeout(() => {
        window.location = "/";
      }, 1000);
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
      appointments,
      isChecked,
      resources,
      toastOpen,
      blocks,
      textbooks
    } = this.state;
    return (
      <React.Fragment>
        <img src="/logo192.png" className="logoImg" alt="logoImg" />
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
                <i className="fas fa-calendar-alt icon"></i> Dashboard
              </Link>
            </li>
            <li onClick={this.unChecked}>
              <Link to="/planner/manage">
                <i className="fas fa-tasks icon"></i>Manage
                <div className="tag">{appointments.length}</div>
              </Link>
            </li>
            <li onClick={this.unChecked}>
              <Link title="Notification" to="/planner/notification">
                <i className="fas fa-bell icon"></i>Notification
                <div className="tag">0</div>
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
              <div className="nameReplace">{this.state.name}</div>
              <div className="actionsReplace">
                <Link onClick={this.unChecked} to="/planner/settings">
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

        <Toast 
          isOpen={toastOpen}
          controlToast={this.controlToast}
        />

        <Switch>
          <Route
            path="/planner"
            exact
            component={() => (
              <Calendar
                appointments={appointments}
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                viewChange={this.currentViewNameChange}
                resources={resources}
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
                appointments={appointments}
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                resources={resources}
                viewChange={this.currentViewNameChange}
              />
            )}
          />

          <Route
            path="/planner/manage"
            component={() => (
              <Manage
                appointments={appointments}
                appointFunc={this.appointFunc}
                resources={resources}
                blocks={blocks}
                textbooks={textbooks}
                updateImports={this.updateImports}
              />
            )}
          />

          <Route
            path="/planner/notification"
            component={() => <Notification />}
          />

          <Route path="/planner/question" component={() => <Question />} />
        </Switch>
      </React.Fragment>
    );
  }
}
