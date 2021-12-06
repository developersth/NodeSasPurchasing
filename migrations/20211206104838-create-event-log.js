'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemNo: {
        type: Sequelize.INTEGER
      },
      doc_no: {
        type: Sequelize.STRING(50)
      },
      event_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING(50)
      },
      details: {
        type: Sequelize.STRING
      },
      record_date: {
        type: Sequelize.DATE
      },
      remark: {
        type: Sequelize.STRING
      },
      update_by: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('event_logs');
  }
};