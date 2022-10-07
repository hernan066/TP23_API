const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
  list: async (req, res) => {
    try {
      const movies = await db.Movie.findAll({
        include: ["genre"],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      res.status(200).json({
        meta: {
          status: 200,
          total: movies.length,
          url: "/api/movies",
        },
        data: movies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  detail: async (req, res) => {
    try {
      const movies = await db.Movie.findByPk(req.params.id, {
        include: ["genre"],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      res.status(200).json({
        meta: {
          status: 200,
          total: movies.length,
          url: `/api/movies/${req.params.id}`,
        },
        data: movies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  new: async (req, res) => {
    try {
      const movies = await db.Movie.findAll({
        order: [["release_date", "DESC"]],
        limit: 5,
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      res.status(200).json({
        meta: {
          status: 200,
          total: movies.length,
          url: `/api/movies/new`,
        },
        data: movies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  recomended: async (req, res) => {
    try {
      const movies = await db.Movie.findAll({
        include: ["genre"],
        where: {
          rating: { [db.Sequelize.Op.gte]: 8 },
        },
        order: [["rating", "DESC"]],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      res.status(200).json({
        meta: {
          status: 200,
          total: movies.length,
          url: `/api/movies/recomended`,
        },
        data: movies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  create: async function (req, res) {
    //return console.log(req.body)

    try {
      const movie = await Movies.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      });
      res.status(200).json({
        meta: {
          status: 200,
          url: `/api/movies`,
        },
        data: movie,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  update: async function (req, res) {
    try {
      let movieUpdate = await Movies.findByPk(req.params.id);

      movieUpdate.title = req.body.title;
      movieUpdate.rating = req.body.rating;
      movieUpdate.awards = req.body.awards;
      movieUpdate.release_date = req.body.release_date;
      movieUpdate.length = req.body.length;
      movieUpdate.genre_id = req.body.genre_id;

      await movieUpdate.save();

      res.status(200).json({
        meta: {
          status: 200,
          url: `/api/movies`,
        },
        data: movieUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  destroy: async function (req, res) {
    try {
      let id = req.params.id;

      const movie = await Movies.findByPk(id);
      await Movies.destroy({
        where: { id },
        force: true,
      });

      res.status(200).json({
        meta: {
          status: 200,
          url: `/api/movies`,
        },
        data: movie,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

module.exports = moviesController;
