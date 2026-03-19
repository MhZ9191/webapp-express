const connect = require("../databases/connect");

function index(req, res) {
  const sqlAllMovies = "select title,genre,abstract,id,image from movies";
  connect.query(sqlAllMovies, (err, resultsIndex) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });

    const resuUp = resultsIndex.map((el) => {
      return { ...el, image: createPathImage(el.image) };
    });

    res.json({
      success: true,
      results: resuUp,
    });
  });
}

function show(req, res) {
  const id = req.params.id;
  const sqlShowOneId =
    "select *,r.id from movies as m inner join reviews as r on m.id=r.movie_id where r.movie_id=?";

  connect.query(sqlShowOneId, [id], (err, resultsShow) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });

    const buildObj = resultsShow.reduce((ac, ce) => {
      const {
        title,
        genre,
        abstract,
        movie_id,
        name,
        vote,
        text,
        created_at,
        image,
        release_year,
        rid = ce.id,
      } = ce;
      ac.id = movie_id;
      ac.title = title;
      ac.genre = genre;
      ac.abstract = abstract;
      ac.image = createPathImage(image);
      ac.reviews = ac.reviews || [];
      ac.release = release_year;
      ac.reviews.push({ name, vote, text, created_at, rid });
      return ac;
    }, {});

    res.json({
      success: true,
      result: buildObj,
    });
  });
}

function storeRev(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const sqlCreateRev =
    "insert into reviews (movie_id,name,vote,text) values(?,?,?,?)";

  connect.query(sqlCreateRev, [id, name, vote, text], (err, resultNew) => {
    if (err)
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });

    const obj = {
      name,
      vote,
      text,
      id_reviews: resultNew.insertId,
    };

    res.json({
      success: true,
      message: "Create new reviews!",
      result: obj,
    });
  });
}

module.exports = { index, show, storeRev };

function createPathImage(img) {
  return `http://${process.env.DB_HOST}:${process.env.APP_PORT}/img/${img}`;
}
