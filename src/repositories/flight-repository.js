const { Sequelize } = require("sequelize");
const db = require("../models");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { addRowLockOnFlight } = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    // here filter is object
    // sort is 2D array
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetails",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportCode"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportCode"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });

    return response;
  }

  async updateRemainingSeats(flightId, seats, toDecrease) {
    //query for locking the row
    await db.sequelize.query(addRowLockOnFlight(flightId));

    const flight = await Flight.findByPk(flightId);

    if (toDecrease) {
      await flight.decrement("remainingSeats", { by: seats });
    } else {
      await flight.increment("remainingSeats", { by: seats });
    }

    return flight;
  }
}

module.exports = FlightRepository;
