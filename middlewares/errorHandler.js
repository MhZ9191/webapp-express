function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    error: "Not found",
  });
}

function internal(err, req, res, next) {
  console.log(err.message);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}

module.exports = { notFound, internal };
