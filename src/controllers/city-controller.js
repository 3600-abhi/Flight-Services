const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * POST: /cities
 * req.body: {name: "Mumbai"}
 */
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({ name: req.body.name });
    SuccessResponse.message = "successfully created the city";
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * PATCH: /cities/:id
 * req.body: {name: "Mumbai"}
 */
async function updateCity(req, res) {
  try {
    const response = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.message = "updated the city name successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * DELETE: /cities/:id
 * req.body: {}
 */
async function destroyCity(req, res) {
  try {
    const response = await CityService.destroyCity(req.params.id);
    SuccessResponse.message = "successfully deleted the city";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error; // this error object is (AppError) object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  updateCity,
  destroyCity,
};
