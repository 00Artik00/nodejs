const range = {
    from: +process.argv[2],
    to: +process.argv[3]
};
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

if (isNaN(range.from) || isNaN(range.to)) {
    console.log("Введите диапазон в виде двух чисел");
}
if (range.from <= 0 || range.to <= range.from) {
    console.log("Диапазон чисел должен быть от m до n, где n и m > 1 и при этом n > m");
} else {
    // Заполнение массива простыми числами
    for (let i = range.from; i <= range.to; i++) {
        if (isPrime(i)) {
            arr.push(i);
        }
    }

    if (arr.length === 0) {
        console.log("В данном диапазоне нет простых чисел")
    } else {
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

}


