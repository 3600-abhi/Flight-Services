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
        modelNumber: "atc 501",
        capacity: 501,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "atc 360",
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
      [Op.or]: [{ modelNumber: "atc 5 01" }, { modelNumber: "atc 360" }],
    });
  },
};
