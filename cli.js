#!E:\nodeJs\node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fsp from "fs/promises";
import fs from "fs"
import readline from "readline";
import path from "path";
import inquirer from "inquirer";
import { stdout } from "process";

const options = yargs(hideBin(process.argv))
    .usage("Usage: -p <path>")
    .option("p", {
        alias: "path", describe: "Path to file", type: "string",
    })
    .option("s", {
        alias: "search", describe: "Search in the file", type: "string",
    })
    .argv;



let userPath = options.path
    ? path.join(process.cwd(), options.path)
    : path.join(process.cwd());


const readdir = async (pathToFile) => {
    return fsp
        .readdir(pathToFile)
        .then((choices) => {
            return inquirer
                .prompt({
                    name: "fileName",
                    type: "list",
                    message: "Choose file:",
                    choices,
                });
        })
        .then(async ({ fileName }) => {
            pathToFile = path.join(pathToFile, fileName);
            const src = await fsp.stat(pathToFile);

            if (!src.isFile()) {
                await readdir(pathToFile);
            } else {
                readFl(pathToFile).then(console.log)
            }
        })

}

const readFl = async (pathToFile) => {

    return inquirer
        .prompt({
            name: "answer",
            type: "list",
            message: "Do you want to search any phrase?",
            choices: ["yes", "no"],
        }).then(async ({ answer }) => {
            if (answer === 'yes') {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question("Please enter phrase to search in the file: ", async function (search) {
                    const result = searchPhrase(pathToFile, search, rl);
                    if (!result) {
                        console.log('nothing found')
                    }

                });



            }
            else {
                fsp.readFile(pathToFile, 'utf-8').then(console.log)
            };

        })


}

const searchPhrase = (pathToFile, search, rl) => {

    const readInterface = readline.createInterface({
        input: fs.createReadStream(pathToFile),

    });
    let somethingFound = false;

    readInterface.on('line', function (line) {
        if (line.includes(search)) {
            somethingFound = true;
            console.log(line)
        }
    });

    rl.close();
    rl.on("close", function () {
        process.exit(0);
    });
    return somethingFound;
}
// Основной код
const userSrc = await fsp.stat(userPath);
userSrc.isFile()
    ? readFl(userPath)
    : await readdir(userPath);


