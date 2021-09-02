'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('UserRoles', [{
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'purchasing',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'sales',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('UserRoles', null, {});
  }
};
