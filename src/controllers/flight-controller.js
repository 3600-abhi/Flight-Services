const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST: /flights
 * req.body: {
 *          flightNumber: "UK 808",
 *          airplaneId: "a380",
 *          departureAirportCode: "LKO",
 *          arrivalAirportCode: "BLR",
 *          departureTime: "01:10:00"
 *          arrivalTime: "03:15:00",
 *          price: "5625",
 *          boardingGate: "12A",
 *          totalSeats: "525"
 *        }
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportCode: req.body.departureAirportCode,
      arrivalAirportCode: req.body.arrivalAirportCode,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      remainingSeats: req.body.remainingSeats,
    });

    SuccessResponse.message = "Successfully created the Flight";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.message = "Successfully fetched the Flights";
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET: /flights/:id
 * req.body: {}
 */
async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.message = "Successfully fetched the flight";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateRemainingSeats(req, res) {
  try {
    const response = await FlightService.updateRemainingSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      toDecrease: req.body.toDecrease,
    });

    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully updated the remaning seats";

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateRemainingSeats,
};
