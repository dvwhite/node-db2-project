const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

// Create
function insert(car) {
  return db("cars")
    .insert(car)
    .then(ids => {
      return getById(ids[0]);
    });
}
