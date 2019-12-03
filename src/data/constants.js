export const DEFAULT_STARTTIME = "00:00";
export const DEFAULT_ENDTIME = "00:01";

export const getCurrentDate = d => {
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