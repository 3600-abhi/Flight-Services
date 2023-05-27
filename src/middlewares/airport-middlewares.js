const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Airport name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.code) {
    ErrorResponse.message = "something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Airport code not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.cityId) {
    ErrorResponse.message = "something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["cityId not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
