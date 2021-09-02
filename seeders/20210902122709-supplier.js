'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Suppliers', [{
      name: 'FMC',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Saculy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'KOMACHINE',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chemtec',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'FMC/TX',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pigging Solution',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
