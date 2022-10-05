const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const { validations } = require("../middlewares/validations");
const { existMovieById } = require("../validations/db_validations");
const movie_validations = require("../validations/movie_validations");

router.get("/", moviesController.list);
router.get("/new", moviesController.new);
router.get("/recommended", moviesController.recomended);
router.get(
  "/:id",
  [
    check("id", "The id must be a number").isNumeric(),
    check("id").custom(existMovieById),
    validations,
  ],
  moviesController.detail
);
//Rutas exigidas para la creación del CRUD

router.post("/", movie_validations, validations, moviesController.create);
router.put(
  "/:id",
  [
    check("id", "The id must be a number").isNumeric(),
    check("id").custom(existMovieById),
    movie_validations,
    validations,
  ],
  moviesController.update
);
router.delete(
  "/:id",
  [
    check("id", "The id must be a number").isNumeric(),
    check("id").custom(existMovieById),
    validations,
  ],
  moviesController.destroy
);

module.exports = router;
