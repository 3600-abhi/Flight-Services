"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("airplanes", [
      {
        modelNumber: "Airbus a380",
        capacity: 501,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "Boeing 747",
        capacity: 360,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("airplanes", {
      [Op.or]: [{ modelNumber: "Airbus a380" }, { modelNumber: "Boeing 747" }],
    });
  },
};
