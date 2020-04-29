const express = require("express");
const router = express.Router();

// Database helper functions
const { get, getById, getByVIN, insert, update, remove } = require("./carDb");

// Constants
EXPECTED_VIN_LENGTH = 17;

// Add a new car record
router.post("/", validateCarVIN, async (req, res, next) => {
  try {
    const newCar = await insert(req.body);
    res.status(200).json({
      message: "Success",
      validation: [],
      data: newCar,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

// Get all car records
router.get("/", async (req, res, next) => {
  try {
    const cars = await get();
    res.status(200).json({
      message: "Success",
      validation: [],
      data: cars,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

// Get a specific car by id
router.get("/:id", validateCarId, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const car = await getById(id);
    res.status(200).json({
      message: "Success",
      validation: [],
      data: car,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

// Update a car by id
router.put("/:id", validateCarId, validateCarVIN, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedCar = await update(id, req.body);
    res.status(200).json({
      message: "Success",
      validation: [],
      data: updatedCar,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

// Delete a car by id
router.delete("/:id", validateCarId, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await remove(id);
    res.status(204).end();
  } catch (err) {
    errDetail(res, err);
  }
});

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
      return res.status(404).json({
        message: "Not Found",
        validation: ["Car id doesn't exist"],
        data: {},
      });
    }
    next();
  } catch (err) {
    errDetail(res, err);
  }
}

/**
 * @function validateCarVIN: Validate the the VIN is unique before submitting req
 * @param {*} req: The request object sent to the API
 * @param {*} res: The response object sent from the API
 * @param {*} next: The express middleware function to move to the next middleware
 * @returns: none
 */
async function validateCarVIN(req, res, next) {
  try {
    const VIN = req.body.VIN;
    const car = await getByVIN(VIN);
    if (car) {
      return res.status(404).json({
        message: "Bad Request",
        validation: ["VIN already exists"],
        data: {},
      });
    } else if (VIN.length > EXPECTED_VIN_LENGTH) {
      // 1 <= VIN.length <= 17
      return res.status(400).json({
        message: "Bad Request",
        validation: ["VIN is not the required length"],
        data: {},
      });
    }
    next();
  } catch (err) {
    errDetail(res, err);
  }
}

function errDetail(res, err) {
  console.log(err);
  return res.status(500).json({
    message: "There was an error performing the required operation",
    validation: [],
    data: {},
  });
}

module.exports = router;
