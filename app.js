const express = require("express");
const app = express();
const port = parseInt(process.env.APP_PORT);
const appUrl = "http://localhost:" + port;
const movieRouter = require("./routers/movieRouter");

app.use(express.static("public"));
app.use(express.json());
app.use("/movies", movieRouter);

app.listen(port, () => {
  console.log("Listening on", appUrl);
});
