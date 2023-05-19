const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST: /airplane
 * req-body: {modelNumber: 'airbus', capacity: 320}
 */

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    SuccessResponse.message = "successfully created the airplane";
    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // the error is an instance of AppError class
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
};
