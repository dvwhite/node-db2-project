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

// Read
function get(){
  return db("cars");
}

/**
 * @function getById: Get the data for the resource with id
 * @param {*} id: The id of the resource to fetch
 * @returns: none
 */
function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}
