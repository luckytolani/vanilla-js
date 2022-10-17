import app from './src/app.js'

import http from "http";

const PORT = 3000;

http
  .createServer((req, res) => {
    const { url, method, headers } = req;

    let urlArray = url.split("/").filter((ele) => ele);

    res.writeHead(200, { "Content-Type": "application/json" });
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", async function () {
      let jsonObj = body ? JSON.parse(body) : {};
      
      res.end(JSON.stringify(app(urlArray , jsonObj , method , headers)));
    });
  }).listen(PORT, () => {
    console.log("Server is Listening to Port", PORT);
  });
