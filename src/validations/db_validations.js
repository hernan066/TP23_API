const db = require("../database/models");

const existGengeById = async (id) => {
  // Verificar si el correo existe
  const existsGenge = await db.Genre.findByPk(id);
  if (!existsGenge) {
    throw new Error(`The id: ${id} does not exist `);
  }
};
const existMovieById = async (id) => {
  // Verificar si el correo existe
  const existsMovie = await db.Movie.findByPk(id);
  if (!existsMovie) {
    throw new Error(`The id: ${id} does not exist `);
  }
};

module.exports = {
  existGengeById,
  existMovieById
};
