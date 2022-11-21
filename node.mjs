import EventEmitter from "events";
const emmiter = new class extends EventEmitter { };
const userDate = process.argv[2];
function getTime({ hour, day, month, year }) {
    return hour * 60 + day * 1440 + month * 43_200 + year * 525_600
}
class Handler {
    static set(userDate) {
        const newDate = new Date();
        const currentDateObj = {
            hour: newDate.getHours(),
            day: newDate.getDate(),
            month: newDate.getMonth() + 1,
            year: newDate.getFullYear()
        }
        const currentDateStr = `${currentDateObj.hour}-${currentDateObj.day}-${currentDateObj.month}-${currentDateObj.year}`;

        const userDateArr = userDate.split("-");
        const userDateObj = {
            hour: +userDateArr[0],
            day: +userDateArr[1],
            month: +userDateArr[2],
            year: +userDateArr[3]
        }
        console.log(getTime(currentDateObj) > getTime(userDateObj));
    }
}
emmiter.on('setTimer', (userDate) => Handler.set(userDate));

if (/([0-2][0-4]\-[0-3][0-9]\-[0-1][0-9]\-[0-9][0-9][0-9][0-9])/.test(userDate)) {
    emmiter.emit('setTimer', userDate);
} else {
    console.log("Incorect date. Please write date in this type: 'hour-day-month-year'");
}
