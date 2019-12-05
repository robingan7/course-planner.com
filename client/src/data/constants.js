export const DEFAULT_STARTTIME = "04:00";
export const DEFAULT_ENDTIME = "04:01";
export const baseUrl = "";

export const getCurrentDate = d => {
    d = new Date(d);
    let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

export const getNextDay = d => {
    let nextDay = new Date(d);
    nextDay.setDate(d.getDate() + 1);

    return nextDay;
}

export const hasNumber = (myString) => {
    return /\d/.test(myString);
}

export const getDuration = (appoint) => {
    let startDateNum = new Date(appoint.startDate).getDate();
    let endDateNum = new Date(appoint.endDate).getDate();

    return endDateNum - startDateNum;
}

export const getAddDayList = (appoint) => {
    let duration = getDuration(appoint);
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

export const fixedDateFromCalendar = (appoint, appointsIn) => {
    for (let key in appoint) {
        let changed = appointsIn[key];
        let oldEndDate = appoint[key].endDate;
        if(oldEndDate === undefined) {
            oldEndDate = changed.endDate;
        }
        let newStart;

        if (appoint[key].startDate === undefined) {
          newStart = changed.startDate;
        } else {
          newStart = getCurrentDate(appoint[key].startDate) + "T" + DEFAULT_STARTTIME;
        }
        let prev = getPrevDay(oldEndDate, newStart); //date obj
        let newEnd = getCurrentDate(prev) + "T" + DEFAULT_ENDTIME;
        
        appoint[key].endDate = newEnd;
        appoint[key].startDate = newStart;
        break;
    }
    return appoint;
};

export const commitChangedFromCalendar = (appoint, appointsIn) => {
    let appoints = appointsIn.slice();
    let index = 0;
    let changeDates = {};
    for (let key in fixedDateFromCalendar(appoint, appointsIn)) {
      index = key;
      changeDates = appoint[key];
      break;
    }
    let changedElement = appoints[index];

    for (let key in changeDates) {
        changedElement[key] = changeDates[key];
    }

    let dayList = getAddDayList(changedElement);
    for(let i = 0; i < dayList.length; i++) {
        let currentEle = dayList[i];
        if(i === 0) {
            appoints[index] = currentEle;
        } else {
            appoints.push(currentEle);
        }
    }
    return appoints;
}

export const addDefaultTime = appoint => {
    let { startDate, endDate } = appoint;/* date object */
    appoint.startDate = getCurrentDate(startDate) + "T" + DEFAULT_STARTTIME;
    appoint.endDate = getCurrentDate(endDate) + "T" + DEFAULT_ENDTIME;

    return appoint;
}

export const trimLongTitle = text => {
    if(text.length > 20) {
        return text.substring(0, 20) + "...";
    }
    return text;
}

export const possibleRemoveDate = d => {
    let [year, month, day]= d.split("-");

    if (month.substring(0, 1) === "0") {
        month = month.substring(1);
    }

    if (day.substring(0, 1) === "0") {
        day = day.substring(1);
    }

    return [year, month, day].join("-");
}

export const SHIFT_KEY = 16;

export const convertDateFormat = appointments => {
    let arr = appointments.slice();
    for (let i = 0; i < arr.length; i++) {
        arr[i].startDate = getCurrentDate(arr[i].startDate) + "T" + DEFAULT_STARTTIME;
        arr[i].endDate = getCurrentDate(arr[i].endDate) + "T" + DEFAULT_ENDTIME;
    }
    return arr;
};

export const addId = arr => {
    if(arr.length === 0) {
        return [];
    }
    let copy = arr.slice();
    for(let i = 0; i < copy.length; i++) {
        copy[i].id = i;
    }
    return copy;
}

const getPrevDay = (d, start) => {
    let dateNum = new Date(start).getDate();
    let nextDay = new Date(d);
    let getDate = nextDay.getDate();
    if (dateNum <= getDate) {
        return nextDay;
    }
    nextDay.setDate(getDate - 1);
    return nextDay;
};
