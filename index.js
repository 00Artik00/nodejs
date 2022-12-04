import http from "http";
import fs from "fs";
import fsp from "fs/promises"
import path from "path";
import { Transform } from "stream";

const host = "localhost";
const port = 3000;



const createLink = (files, curUrl) => {
  if (curUrl.endsWith("/")) curUrl = curUrl.substring(0, curUrl.length - 1);
  console.log(`curUrl in createLink: ${curUrl}`);
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

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
