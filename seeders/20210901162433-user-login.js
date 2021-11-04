'use strict';
const bcrypt = require('bcrypt');
function passwordHash(pasword){
  return bcrypt.hashSync(pasword, 10)
}
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
    return await queryInterface.bulkInsert('users', [{
      username: 'admin',
      role_id: 1,
      name:'Administrator',
      password: passwordHash('admin'),
      mobile:'+66 99999 9999',
      email: 'admin@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user',
      role_id: 2,
      name:'Users',
      password: passwordHash('user'),
      mobile:'+66 84292 252',
      email: 'user@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'ning',
      role_id: 3,
      name:'Suchanya Sripumkai',
      password: passwordHash('1234'),
      mobile:'+66 98820 0799',
      email: 'suchanya@ginnovation.co.th',
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
    return await queryInterface.bulkDelete('users', null, {});
  }
};
