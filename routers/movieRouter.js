const express = require("express");
const movie = express.Router();
const controller = require("../controllers/movieController");

movie.get("/", controller.index);
movie.get("/:id", controller.show);
movie.post("/:id/new", controller.storeRev);

module.exports = movie;
