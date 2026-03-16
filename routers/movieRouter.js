const express = require("express");
const movie = express.Router();
const controller = require("../controllers/movieController");

movie.get("/", controller.index);
movie.get("/:id", controller.show);

module.exports = movie;
