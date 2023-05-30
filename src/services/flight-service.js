const { Op } = require("sequelize");
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

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];

  // trips="LKO-MUM"
  if (query.trips) {
    const [departureAirportCode, arrivalAirportCode] = query.trips.split("-");
    customFilter.departureAirportCode = departureAirportCode;
    customFilter.arrivalAirportCode = arrivalAirportCode;
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [
        minPrice === undefined ? 0 : minPrice,
        maxPrice === undefined ? 10000000 : maxPrice,
      ],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    sortFilter = params.map((param) => param.split("_"));
  }

  if (query.tripDate) {
    const dayStartingTime = " 00:00:00";
    const dayEndingTime = " 23:59:59";
    customFilter.departureTime = {
      [Op.between]: [
        query.tripDate + dayStartingTime,
        query.tripDate + dayEndingTime,
      ],
    };
  }

  if (query.travellers) {
    customFilter.remainingSeats = {
      [Op.gte]: query.travellers,
    };
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
