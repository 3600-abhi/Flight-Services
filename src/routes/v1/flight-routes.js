const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

/**
 * POST: /api/v1/flights
 */
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

/**
 * GET: /api/v1/flights?trips=LKO-MUM
 */
router.get("/", FlightController.getAllFlights);

/**
 * GET: /api/v1/flights/:id
 */
router.get("/:id", FlightController.getFlight);

/**
 * PATCH: /api/v1/flights/reminingSeats
 */
router.patch(
  "/:id/seats",
  FlightMiddlewares.validateUpdateRemainingSeatsRequest,
  FlightController.updateRemainingSeats
);

module.exports = router;
