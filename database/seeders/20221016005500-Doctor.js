'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Doctors',
      [
        {
          name: 'Doctor Jane Doe',
          email: 'drjanedoe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Doctor Jon Doe',
          email: 'drjondoe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Doctors', null, {})
  }
};
