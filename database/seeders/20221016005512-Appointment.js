'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Appointments",
      [
        {
          doctorId: 1,
          patientId: 2,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          doctorId: 2,
          patientId: 1,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {})

  }
};
