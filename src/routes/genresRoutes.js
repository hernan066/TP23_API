const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const genresController = require("../controllers/genresController");
const { validations } = require("../middlewares/validations");
const { existGengeById } = require("../validations/db_validations");

router.get("/", genresController.list);

router.get(
  "/:id",
  [
    check("id", "The id must be a number").isNumeric(),
    check("id").custom(existGengeById),
    validations,
  ],
  genresController.detail
);

module.exports = router;
