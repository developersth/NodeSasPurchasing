'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        field: 'role_id',
      },
      username: {
        type: Sequelize.STRING(100),
        field: 'username'
      },
      mobile: {
        type: Sequelize.STRING(15),
        field: 'mobile'
      },
      email: {
        type: Sequelize.STRING(100),
        field: 'email'
      },
      password: {
        type: Sequelize.STRING,
        field: 'password'
      },
      token: {
        type: Sequelize.TEXT,
        field: 'token'
      },
      name: {
        type: Sequelize.STRING(100),
        field: 'name'
      },
      department_id: {
        type: Sequelize.INTEGER,
        field: 'department_id'
      },
      ip: {
        type: Sequelize.STRING(50),
        field: 'ip'
      },
      session_id: {
        type: Sequelize.STRING(32),
        field: 'session_id'
      },
      image_path: {
        type: Sequelize.STRING,
        field: 'image_path'
      },
      last_login: {
        type: Sequelize.DATE(),
        field: 'last_login',
      },
      status: {
        type: Sequelize.BOOLEAN,
        field: 'status',//0=หยุดใช้งาน,1 = ใช้งาน
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};