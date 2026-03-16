const connect = require("../databases/connect");

function index(req, res) {
  const sqlAllMovies = "select * from movies";
  connect.query(sqlAllMovies, (err, resultsIndex) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    res.json({
      success: true,
      results: resultsIndex,
    });
  });
}

function show(req, res) {
  const id = req.params.id;
  const sqlShowOneId =
    "select m.title,m.genre,r.vote,r.name,r.movie_id,r.text from movies as m inner join reviews as r on m.id=r.movie_id where m.id=?";

  connect.query(sqlShowOneId, [id], (err, resultsShow) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });

    const buildObj = resultsShow.reduce((ac, ce) => {
      const { title, genre, movie_id, name, vote, text } = ce;
      ac.id = movie_id;
      ac.title = title;
      ac.genre = genre;
      ac.reviews = ac.reviews || [];
      ac.reviews.push({ name, vote, text });
      return ac;
    }, {});

    res.json({
      success: true,
      result: buildObj,
    });
  });
}

module.exports = { index, show };
