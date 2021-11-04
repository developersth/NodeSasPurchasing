'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('status_desc', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      ColumnName: {
        type: Sequelize.STRING
      },
      StatusNumber: {
        type: Sequelize.INTEGER
      },
      StatusVarchar: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      UpdateBy: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('status_desc');
  }
};