const connect = require("../databases/connect");

function index(req, res) {
  res.json({
    success: true,
    message: "ok",
  });
}

module.exports = { index };
