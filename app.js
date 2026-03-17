const express = require("express");
const app = express();
const port = parseInt(process.env.APP_PORT);
const appUrl = "http://localhost:" + port;
const movieRouter = require("./routers/movieRouter");
const error = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors({ origin: process.env.FRONT_URL }));
app.use(express.static("public"));
app.use(express.json());
app.use("/movies", movieRouter);

app.use(error.notFound);
app.use(error.internal);
app.listen(port, () => {
  console.log("Listening on", appUrl);
});
