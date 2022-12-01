// #!E:\nodeJs\node
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
import fsp from "fs/promises";
// import fs from "fs"
// import readline from "readline";rea
import path from "path";
// import inquirer from "inquirer";


// const options = yargs(hideBin(process.argv))
//     .usage("Usage: -p <path>")
//     .option("p", {
//         alias: "path", describe: "Path to file", type: "string",
//     })
//     .argv;


// Преобразовываем путь до искомого файла или директории. Если не передать путь,
// то за точку отсчета будет взята текущая директория
let userPath = path.join(process.cwd());

// // Функция для чтения директории, если выбрать подкаталог, то получаем его внутренности
// const readdir = async (pathToFile) => {
//     return fsp
//         .readdir(pathToFile)
//         .then((choices) => {
//             return inquirer
//                 .prompt({
//                     name: "fileName",
//                     type: "list",
//                     message: "Choose file:",
//                     choices,
//                 });
//         })
//         .then(async ({ fileName }) => {
//             pathToFile = path.join(pathToFile, fileName);
//             const src = await fsp.stat(pathToFile);

//             if (!src.isFile()) {
//                 await readdir(pathToFile);
//             } else {
//                 readFl(pathToFile).then(console.log)
//             }
//         })

// }
// // Функция для чтения файла. Первый выбор: если выбрать что не хотим вводить фразу
// // для поиска, то получим сразу текст файла иначе получим команду ввести фразу для
// // поиска по файлу
// const readFl = async (pathToFile) => {

//     return inquirer
//         .prompt({
//             name: "answer",
//             type: "list",
//             message: "Do you want to search any phrase?",
//             choices: ["yes", "no"],
//         }).then(async ({ answer }) => {
//             if (answer === 'yes') {
//                 const rl = readline.createInterface({
//                     input: process.stdin,
//                     output: process.stdout
//                 });
//                 rl.question("Please enter phrase to search in the file: ", async function (search) {
//                     searchPhrase(pathToFile, search, rl);
//                 });
//             }
//             else {
//                 fsp.readFile(pathToFile, 'utf-8').then(console.log)
//             };

//         })


// }
// // Функция для поиска строк в файле, в которых есть заданная пользователем подстрока
// const searchPhrase = (pathToFile, search, rl) => {

//     const readInterface = readline.createInterface({
//         input: fs.createReadStream(pathToFile),

//     });
//     readInterface.on('line', function (line) {
//         if (line.includes(search)) {
//             console.log(line)
//         }
//     });

//     rl.close();
//     rl.on("close", function () {
//         process.exit(0);
//     });
// }

// // Запуск программы
// const userSrc = await fsp.stat(userPath);
// // Проверяем, что нужно прочитать файл или директорию
// userSrc.isFile()
//     ? readFl(userPath)
//     : await readdir(userPath);



const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: ['file1', 'file1', 'file1', 'file1', 'file1',],
        filtered: [],
        cart: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false,
    },
    methods: {

    },
    mounted() {
        fsp.readdir(pathToFile).then((files) => {
            files.forEach(el => {
                products.push(el);
            });
        })
    }
})
