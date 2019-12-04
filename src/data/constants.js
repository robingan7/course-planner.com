export const DEFAULT_STARTTIME = "00:00";
export const DEFAULT_ENDTIME = "00:01";
export const baseUrl = "http://localhost:5000";

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
