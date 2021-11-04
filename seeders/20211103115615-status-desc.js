'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('status_desc', [
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S10',
      description:'Active',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S20',
      description:'Acknowledge',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S30',
      description:'Delay',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S31',
      description:'For Ship',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S40',
      description:'Ship S40',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S41',
      description:'Ship S41',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S50',
      description:'On Board',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S60',
      description:'Received',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S99',
      description:'Completed',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('status_desc', null, {});

  }
};
