const db = require("../database/models");

const genresController = {
  list: async (req, res) => {
    const genres = await db.Genre.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    res.status(200).json({
      meta: {
        status: 200,
        total: genres.length,
        url: "/api/genres",
      },
      data: genres,
    });
  },
  detail: async (req, res) => {
    const genre = await db.Genre.findByPk(req.params.id, {
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    res.status(200).json({
      meta: {
        status: 200,
        url: `/api/genres/${req.params.id}`,
      },
      data: genre,
    });
  },
};

module.exports = genresController;
