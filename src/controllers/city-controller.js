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

module.exports = {
  createCity,
};
