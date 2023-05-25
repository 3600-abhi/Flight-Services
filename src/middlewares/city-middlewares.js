const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "something went wrong while creating city";
    ErrorResponse.error = new AppError(
      ["city name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "something went wrong while updating city";
    ErrorResponse.error = new AppError(
      ["city name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
