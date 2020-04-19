const express = require("express");
const router = express.Router();

// Database helper functions
const {
  get,
  getById,
  insert,
  update,
  remove
} = require("./carDb");



/**
 * @function validateCarId: Validate the the id exists before submitting req
 * @param {*} req: The request object sent to the API
 * @param {*} res: The response object sent from the API
 * @param {*} next: The express middleware function to move to the next middleware
 * @returns: none
 */
async function validateCarId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const car = await getById(id);
    if (!car) {
      return res.status(404).json({ message: "User id doesn't exist"})
    }
    next();
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "There was an error performing the required operation" });
  }
}

module.exports = router;
