const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanations = [];
      error.errors.forEach((err) => explanations.push(err.message));
      throw new AppError(explanations, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
