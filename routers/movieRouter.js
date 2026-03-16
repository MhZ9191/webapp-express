const express = require("express");
const movie = express.Router();
const controller = require("../controllers/movieController");

movie.get("/", controller.index);

module.exports = movie;
