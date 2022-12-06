import http from "http";

import fs from "fs";
import path from "path";
import { Server } from "socket.io"

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
  client.broadcast.emit('OFFER-DATA', { name: client.name });
  //Вывод сообщения в консоль сервера(vsCode)
  console.log('Websocket connected')
  // После того, как клиент прислал сообщение на сервер, мы его пересылаем  всем
  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { msg: `${client.name}: ${data.msg}` })
    client.emit('server-msg', { msg: `${client.name}: ${data.msg}` })
  })

})
// io.on('disconnection', (client) => {
//   console.log('disconnect with localhost:3000 created');
//   client.broadcast.emit('NEW_DISC_EVENT', { msg: 'The old client disconnected' });
// });
// io.on('reconnection', (client) => console.log('reconnect with localhost:3000 created'));


server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
