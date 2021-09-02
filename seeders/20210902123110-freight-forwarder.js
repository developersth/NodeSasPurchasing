'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('freightforworders', [{
      name: 'DHL',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'FedEx',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Penanshin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'AIL',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('freightforworders', null, {});
  }
};
