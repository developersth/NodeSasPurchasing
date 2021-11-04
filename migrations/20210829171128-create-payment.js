'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PaymentDate: {
        type: Sequelize.DATE
      },
      Status: {
        type: Sequelize.STRING,
        defaultValue:'Incomplete'
      },
      PaymentName: {
        type: Sequelize.STRING(50)
      },
      PaymentTo: {
        type: Sequelize.STRING(50)
      },
      PurposeId: {
        type: Sequelize.INTEGER
      },
      PurposeName: {
        type: Sequelize.STRING(50)
      },
      PurposeOther: {
        type: Sequelize.STRING(50)
      },
      PoNo: {
        type: Sequelize.STRING(20)
      },
      PRNo: {
        type: Sequelize.TEXT
      },
      InvoiceNo: {
        type: Sequelize.STRING(20)
      },
      AirWayBillNo: {
        type: Sequelize.STRING(20)
      },
      itemPR: {
        type: Sequelize.JSON
      },
      PriceTotal: {
        type: Sequelize.DECIMAL(15,2)
      },
      createBy: {
        type: Sequelize.STRING(60)
      },
      updateBy: {
        type: Sequelize.STRING(60)
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
    await queryInterface.dropTable('payments');
  }
};