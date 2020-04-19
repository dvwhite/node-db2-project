const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");

// Middlewarae
server.use(express.json());

// Routes
const carsRoute = require("./cars/carRouter");
server.use("/cars", carsRoute);

/* Third party middleware */
server.use(cors());
server.use(morgan("dev"));

/* Error middleware */
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "There was an error performing the required operation" })
});

module.exports = server;
