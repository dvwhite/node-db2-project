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

// Add a new car record
router.post("/", async (req, res, next) => {
  try {
    const newCar = insert(req.body);
    res.status(200).json(newCar);
  }
  catch (err) {
    console.log(err);
    next(err);
  }
});

// Get all car records
router.get("/", async (req, res, next) => {
  try {
    const cars = await get();
    res.status(200).json(cars);
  }
  catch (err) {
    console.log(err);
    next(err);
  }
});

// Get a specific car by id
router.get("/:id", validateCarId, async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const car = await getById(id);
    res.status(200).json(car);
  }
  catch (err) {
    console.log(err);
    next(err);
  }
});

// Update a car by id
router.put("/:id", validateCarId, async (req, res, next) => {
  try {
    const newCar = await insert(req.body);
    res.status(200).json(newCar);
  }
  catch {
    console.log(err);
    next(err);
  }
});

// Delete a car by id
router.delete("/:id", validateCarId, async (req, res, next) => {
  try {
    await remove(id);
    res.send(204).end();
  }
  catch {
    console.error(err);
    next(err);
  }
})

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
