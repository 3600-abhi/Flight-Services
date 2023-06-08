const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");
const { compareTime } = require("../utils/helpers/datetime-helper");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["flightNumber not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["airplaneId not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportCode) {
    ErrorResponse.message = "Something went wrong while creating aFlight";
    ErrorResponse.error = new AppError(
      ["departureAirportCode not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportCode) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["arrivalAirportCode not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["departureTime not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["arrivalTime not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["price not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.remainingSeats) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["totalSeats not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // checking whether departureTime is lesser than arrivalTime or not
  if (!compareTime(req.body.departureTime, req.body.arrivalTime)) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Arrival time cannot be lesser or equal to Departure time"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.price <= 0) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Price cannot be zero or negative"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRemainingSeatsRequest(req, res, next) {
  if (req.body.seats === undefined) {
    ErrorResponse.message =
      "Something went wrong while updating the remaining seats";
    ErrorResponse.error = new AppError(
      ["seats not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.toDecrease === undefined) {
    ErrorResponse.message =
      "Something went wrong while updating the remaining seats";
    ErrorResponse.error = new AppError(
      ["toDecrease not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRemainingSeatsRequest,
};
