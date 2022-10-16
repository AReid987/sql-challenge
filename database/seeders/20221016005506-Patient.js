'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Patients',
      [
        {
          name: 'Ms. Jane Doe',
          email: 'msjanedoe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Mr. Jon Doe',
          email: 'mrjondoe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Patients', null, {})
  }
};
