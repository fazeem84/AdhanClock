import { DateTime } from "luxon";

export function getTodaysData(data) {
    var obj = data.find(item => {
        var dateObj = item.date.gregorian;
        if (
            DateTime.fromFormat(dateObj.date, "dd-MM-yyyy")
                .startOf("day")
                .equals(DateTime.local().startOf("day"))
        ) {
            console.log("Got--------------" + dateObj.date);
            return true;
        }
    });
    console.log("Got" + JSON.stringify(obj));
    return obj;
}
export function getNextPrayer(data) {
    var currentDateTime = DateTime.local();
    var nextPrayer = {};
    var currTime = Date.parse(
        "01/01/2011 " +
            currentDateTime.hour +
            ":" +
            currentDateTime.minute +
            ":" +
            currentDateTime.second
    );
    nextPrayer.name = "Fajr";
    nextPrayer.time = data.timings.Fajr.substring(0, 5);

    if (currTime > getParsedTime(data.timings.Fajr)) {
        nextPrayer.name = "Dhuhr";
        nextPrayer.time = data.timings.Dhuhr.substring(0, 5);

    }
    if (currTime > getParsedTime(data.timings.Dhuhr)) {
        nextPrayer.name = "Asr";
        nextPrayer.time = data.timings.Asr.substring(0, 5);
    }
    if (currTime > getParsedTime(data.timings.Asr)) {
        nextPrayer.name = "Maghrib";
        nextPrayer.time = data.timings.Maghrib.substring(0, 5);
    }
    if (currTime > getParsedTime(data.timings.Maghrib)) {
        nextPrayer.name = "Isha";
        nextPrayer.time = data.timings.Isha.substring(0, 5);
    }
    if (currTime > getParsedTime(data.timings.Isha)) {
        nextPrayer = "NextDay ";
    }

    return nextPrayer;
}

export function getParsedTime(data) {
    return Date.parse("01/01/2011 " + data.substring(0, 5) + ":00");
}
