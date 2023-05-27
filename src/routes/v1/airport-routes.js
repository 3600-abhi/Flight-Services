const express = require("express");
const { AirportController, AirplaneController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

/**
 * POST: /api/v1/airports
 */
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

/**
 * GET: /api/v1/airports
 */
router.get("/", AirportController.getAirports);

/**
 * GET: /api/v1/airports/:id
 */
router.get("/:id", AirportController.getAirport);

/**
 * PATCH: /api/v1/airports/:id
 */
router.patch("/:id", AirportController.updateAirport);

/**
 * DELETE: /api/v1/airports/:id
 */
router.delete("/:id", AirportController.destroyAirport);

module.exports = router;
