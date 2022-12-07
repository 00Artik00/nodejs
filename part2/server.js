import http from "http";

import fs from "fs";
import path from "path";
import { Server } from "socket.io";

import fsp from "fs/promises"
import { Transform } from "stream";

// import { Manager } from "socket.io-client";

const host = "localhost";
const port = 3000;
const createLink = (files, curUrl) => {
  if (curUrl.endsWith("/")) curUrl = curUrl.substring(0, curUrl.length - 1);

  let li = "";
  for (const file of files) {
    li += `<li><a href="${curUrl}/${file}">${file}</a></li>`;
  }

  return li;
};

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const url = request.url.split("?")[0];

    const curPath = path.join(process.cwd(), url);


    fs.stat(curPath, (err, stat) => {

      if (err) {
        response.end(err)
      }

      if (stat.isFile(curPath)) {

        const readStream = fs.createReadStream(curPath, "utf-8");
        readStream.pipe(response);

      } else {
        fsp
          .readdir(curPath)
          .then((files) => {

            if (url !== "/") files.unshift("..");

            return files;
          })
          .then((data) => {
            // render

            const filePath = path.join(process.cwd(), "./index.html");

            const readStream = fs.createReadStream(filePath);
            const transformStream = new Transform({
              transform(chunk, encoding, callback) {
                const li = createLink(data, url);

                const toPush = chunk.toString().replace("#filelinks#", li);

                this.push(toPush);

                callback();
              },
            });

            readStream.pipe(transformStream).pipe(response);
          });
      }
    });
  }
});


const io = new Server(server);
const clients = [];
//Соединение клиента с сервером
io.on('connection', (client) => {

  clients.push(client);
  //Отправка запроса, чтоб на стороне каждого клиента вывелось сообщение о конекте нового клиента
  client.broadcast.emit('ADD_CONN_EVENT', clients.length);
  client.emit('ADD_CONN_EVENT', clients.length);


  //Вывод сообщения в консоль сервера(vsCode)
  console.log('Websocket connected')


  //Если клиент закрыл страницу браузера выводим, сообщение, что он вышел
  client.on('disconnecting', () => {
    clients.splice(clients.indexOf(clients.find(cl => cl === client.id)), 1)
    client.broadcast.emit('SUB_DISCONN_EVENT', clients.length);
    client.leave()
  })



})





server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
