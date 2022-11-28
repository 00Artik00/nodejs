import fs from 'fs';
import readline from 'readline';

const pathToRead = "access_tmp.log.txt";
const ips = ['89.123.1.41', "34.48.240.111"]
const readInterface = readline.createInterface({
    input: fs.createReadStream(pathToRead),
});
ips.forEach(ip => {
    const writeStream = fs.createWriteStream(ip + "_requests.log", {
        flags: 'a',
        encoding: 'utf8'
    });


    readInterface.on('line', function (line) {
        if (line.includes(ip)) {
            writeStream.write(line + "\n")
        }
    });
})






