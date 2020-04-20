const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  getByVIN,
  insert,
  update,
  remove
};

// Create
function insert(car) {
  return db("cars")
    .insert(car)
    .then(ids => {
      console.log('ids:', ids)
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

/**
 * @function getByVIN: Get the data for the resource with VIN
 * @param {*} vin: The id of the resource to fetch
 * @returns: none
 */
function getByVIN(vin) {
  return db("cars")
    .where({ vin })
    .first();
}

/**
 * @function update: Update the resource with id
 * @param {*} id: The id of the resource to update
 * @param {*} updates: The changes to update the resource
 * @returns: none
 */
// Update
function update(id, updates) {
  return db("cars")
    .where({ id })
    .update(updates)
    .then(ids => {
      console.log("updates:", ids)
      // return getById(ids[0]);
    });
}

// Delete

/**
 * @function remove: Deletes the resource with id
 * @param {*} id: The id of the resource to delete
 * @returns: none
 */
function remove(id) {
  return db("users")
    .where({ id })
    .delete();
}