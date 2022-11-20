import EventEmitter from "events";
const emmiter = new class extends EventEmitter { };
const date = process.argv[2];

class Handler {
    static set(payload) {
        /// основной код
        console.log("Текущая дата: " + payload);
    }
}
emmiter.on('setTimer', (date) => Handler.set(date));

if (/([0-23]+\-[1-31]+\-[1-12]+\-\d{0,4})/.test(date)) {
    emmiter.emit('setTimer', date);
} else {
    console.log("Incorect date. Please write date in this type: 'hour-day-month-year'");
}
