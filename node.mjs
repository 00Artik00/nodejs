import EventEmitter from "events";
import dayjs from 'dayjs';
const emmiter = new class extends EventEmitter { };

//Так как в задание не было сказано про минуты и секунды, принудительно выставляю
// их в ноль
const userDate = dayjs(new Date(process.argv[2] + ":00:00"));

/**
 * Функция для получения получения времени в секундах между пользовательским вре-
 * менем и текущим.
 * @param {object} currentDate - текущие время в виде объекта dayjs
 * @returns {number} - Колличество секунд между текущим и пользовательским временем
 */
function getTime(currentDate) {
    const currentTime = currentDate.format('YYYY-MM-DD[T]HH:mm:ss[+03:00]');
    const userTime = userDate.format('YYYY-MM-DD[T]HH:mm:ss[+03:00]');
    const time = (new Date(userTime).getTime() - new Date(currentTime).getTime()) / 1000;
    return time;
}

/**
 * Функция, которая запускает таймер
 * @param {*} currentDate - текущее время в виде объекта dayjs
 */
function timer(currentDate) {
    //Время работы таймера
    let time = getTime(currentDate);

    //Получение начального значения времени между пользовательским и текущим времени
    let day = Math.trunc(time / 86_400);
    let hour = Math.trunc((time - day * 86_400) / 3600);
    let minute = Math.trunc((time - day * 86_400 - hour * 3_600) / 60);
    let second = time - day * 86_400 - hour * 3_600 - minute * 60;

    //Таймер
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
    console.log("Не правильный формат времени, пожалуйста введите время в \
следующем фомате: 'год-месяц-день:час'");
}
