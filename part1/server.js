import http from "http";

import fs from "fs";
import path from "path";
import { Server } from "socket.io"
// import { Manager } from "socket.io-client";

const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
  if (["GET", "POST", "PUT"].includes(req.method)) {

    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});

const io = new Server(server);

//Соединение клиента с сервером
io.on('connection', (client) => {

  //Рандомное имя для данного клиента
  client.name = `${Math.round(Math.random() * 10)} user`;
  //Отправка запроса, чтоб на стороне каждого клиента вывелось сообщение о конекте нового клиента
  client.broadcast.emit('NEW_CONN_EVENT', { msg: `${client.name} connected` });
  client.emit('NEW_CONN_EVENT', { msg: `Welcome. You are connected` });


  //Вывод сообщения в консоль сервера(vsCode)
  console.log('Websocket connected')
  // После того, как клиент прислал сообщение на сервер, мы его пересылаем  всем, подписывая от какого клиента сообщение.
  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { msg: `${client.name}: ${data.msg}` })
    client.emit('server-msg', { msg: `${client.name}: ${data.msg}` })
  })


  //Если клиент закрыл страницу браузера выводим, сообщение, что он вышел
  client.on('disconnecting', () => {
    client.broadcast.emit('NEW_DISCONN_EVENT', { msg: `${client.name} disconnected` });
  })



})





server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
