const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("title")
    .notEmpty()
    .withMessage("The title is required")
    .bail()
    .isLength({
      min: 1,
      max: 500,
    })
    .withMessage("The title must have between 1 to 500 characters"),
  check("rating")
    .notEmpty()
    .withMessage("The rating is required")
    .bail()
    .isNumeric()
    .withMessage("Rating must be a number"),

  check("awards")
    .notEmpty()
    .withMessage("The awards is required")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Rating must be a positive number"),

  check("release_date")
    .notEmpty()
    .withMessage("Release date is required")
    .bail()
    .isDate()
    .withMessage("Release date must be a date"),
  check("length")
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Length must be a positive number"),

  body("genre_id")
    .notEmpty()
    .withMessage("The awards is required")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .bail()
    .withMessage("Rating must be a positive number")
    .custom((value) => {
      return db.Genre.findByPk(value).then((genre) => {
        if (!genre) {
          return Promise.reject(`There is no gender with Id:${value}`);
        }
      });
    }),
];
