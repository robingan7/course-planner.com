import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton
} from "@devexpress/dx-react-scheduler-material-ui";

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
          appointments,
          currentDate,
          currentViewName,
          viewChange
        } = this.props;

        return (
          <Paper>
            <Scheduler data={appointments}>
              <ViewState
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                onCurrentViewNameChange={viewChange}
              />
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
            </Scheduler>
          </Paper>
        );
    };
}