const express = require("express");
const app = express();
const port = parseInt(process.env.APP_PORT);
const appUrl = "http://localhost:" + port;
const connect = require("./databases/connect");

app.listen(port, () => {
  console.log("Listening on", appUrl);
});
