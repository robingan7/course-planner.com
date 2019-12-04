import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState, IntegratedEditing  } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  DragDropProvider,
  AppointmentForm,
  ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";
import { Resources } from "@devexpress/dx-react-scheduler-material-ui";
import { SHIFT_KEY } from "../../data/constants";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  container: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
});

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.props.setIsShiftPressed(true);
    }
  }

  onKeyUp(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.props.setIsShiftPressed(false);
    }
  }

  handleChange(event){
    this.props.setAutoAdjustCalendar(event.target.checked);
  }

  render() {
    const {
      appointments,
      currentDate,
      currentViewName,
      viewChange,
      resources,
      mainResourceName,
      autoAdjustCalendar
    } = this.props;

    return (
      <div>
        <FormControlLabel
          control={
            <Switch checked={autoAdjustCalendar} value="checkeda" onChange={this.handleChange}/>
          }
          label="Auto Adjust"
          className="switchCalendar"
        />

      <div className="calendarBody">
        <Paper style={{
          width: "100%",
          height: "100%"
        }}>
        <Scheduler data={appointments}>
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={viewChange}
          />
          <EditingState
              onCommitChanges={this.props.commitChangesFromCalendar}
          />
          <IntegratedEditing />
          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <ConfirmationDialog />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <DragDropProvider />
          <AppointmentForm />
          <Resources
            data={resources}
            mainResourceName={mainResourceName}
          />
        </Scheduler>
      </Paper>
      </div>
      </div>
    );
  };
}