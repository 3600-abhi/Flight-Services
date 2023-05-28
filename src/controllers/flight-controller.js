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
      totalSeats: req.body.totalSeats,
    });

    SuccessResponse.data = flight;
    SuccessResponse.message = "Successfully created the Flight";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
};
