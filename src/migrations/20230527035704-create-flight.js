"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // table: "Airplanes",
          // field: "id",
          // we need to use (model, key) instead of (table, field) when using inside createTable
          // function insted of addConstraint function
          model: "Airplanes",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      departureAirportCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          // table: "Airports",
          // field: "code",
          // we need to use (model, key) instead of (table, field) when using inside createTable
          // function insted of addConstraint function
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      arrivalAirportCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          // table: "Airports",
          // field: "code",
          // we need to use (model, key) instead of (table, field) when using inside createTable
          // function insted of addConstraint function
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: Sequelize.STRING,
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  },
};
