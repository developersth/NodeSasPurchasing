'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('status_desc', [
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S10',
      description:'Active',
      color:'secondary',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S20',
      description:'Acknowledge',
      color:'primary',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S30',
      description:'Delay',
      color:'orange',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S31',
      description:'For Ship',
      color:'pink',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S40',
      description:'Ship S40',
      color:'red',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S41',
      description:'Ship S41',
      color:'secondary',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S50',
      description:'On Board',
      color:'indigo',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S60',
      description:'Received',
      color:'info',
      updateby:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'PO_MANAGEMENT',
      columnname:'P_STATUS',
      statusvarchar:'S99',
      description:'Completed',
      color:'green',
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
