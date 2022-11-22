import EventEmitter from "events";
import dayjs from 'dayjs';
import { getSystemErrorMap } from "util";
const emmiter = new class extends EventEmitter { };
const userDate = dayjs(new Date(process.argv[2] + ":43:00"));
function getTime(currentDate) {
    const currentTime = currentDate.format('YYYY-MM-DD[T]HH:mm:ss[+03:00]');
    const userTime = userDate.format('YYYY-MM-DD[T]HH:mm:ss[+03:00]');
    const time = (new Date(userTime).getTime() - new Date(currentTime).getTime()) / 1000;
    return time;
}
function timer(currentDate) {
    let time = getTime(currentDate);

    let day = Math.trunc(time / 86_400);
    let hour = Math.trunc((time - day * 86_400) / 3600);
    let minute = Math.trunc((time - day * 86_400 - hour * 3_600) / 60);
    let second = time - day * 86_400 - hour * 3_600 - minute * 60;

    let timer = setInterval(() => {
        if (time === 1) {
            clearInterval(timer);
        }
        time--;
        second--;
        console.clear();
        console.log(`${day} day ${hour} hour ${minute} minute ${second} second`);


        if (second === 0) {
            second = 60;
            minute--;
        }
        if (minute === 0) {
            minute = 59;
            hour--;
        }
        if (hour === 0) {
            hour = 23;
            day--;
        }

    }, 1000)
}

class Handler {
    static set(userDate) {
        let currentDate = dayjs();

        if (currentDate.isSame(userDate)) {
            console.log('Таймер истек');
        }
        if (currentDate.isAfter(userDate)) {
            console.log('Таймер истек');
        }
        if (currentDate.isBefore(userDate)) {
            timer(currentDate)
        }
    }
}
emmiter.on('setTimer', (userDate) => Handler.set(userDate));

if (userDate.isValid()) {
    emmiter.emit('setTimer', userDate);
} else {
    console.log("Incorect date. Please write date in this type: 'year-month-day:hour'");
}
