const range = +process.argv[2];
const arr = [];
const colors = require("colors/safe");
/**
  * Данная функция проверяет простое ли число
  * @param {number} n - Любое число
  * @returns {boolean} Функция возвращает true если число простое и false если
  * число составное
  */
function isPrime(n) {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) return false;
    return true;
}

if (isNaN(range)) {
    console.log("Введите число");
}
if (range <= 0) {
    console.log("Введите положительное число");
} else {
    // Заполнение массива простыми числами
    for (let i = 2; i <= range; i++) {
        if (isPrime(i)) {
            arr.push(i);
        }
    }
    //  выводим на экран полученный массив, и подсвечиваем каждую цифру 
    //  определенным цветом
    for (let i = 0; i < arr.length; i++) {
        let color = 'red';
        if (i === 0 || i % 3 === 0) {
            color = "green"
        }
        if (i === 2 || i % 3 === 2) {
            color = "yellow"
        }

        console.log(colors[color](arr[i]));
    }
}


