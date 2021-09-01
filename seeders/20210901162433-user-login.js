'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const passwordHash = bcrypt.hashSync('admin', 10);
    return await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      role_id: 1,
      name:'Administrator',
      password: passwordHash,
      email: 'admin@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user',
      role_id: 2,
      name:'Users',
      password: '$2b$10$FpR5FtGi2RvyXaSFL1qpGOvS3E8a2XFO1geL.b6y.VOyzu2mHZMPW',
      email: 'admin@example.com',
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
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
