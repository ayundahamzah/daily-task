'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      Task: 'Cuci Mobil',
      price: 30000,
      estimatedTimeOfWork:30,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      Task: 'Cuci Motor',
      price: 25000,
      estimatedTimeOfWork:25,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      Task: 'Wax Mobil',
      price: 50000,
      estimatedTimeOfWork:60,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      Task: 'Wax Motor',
      price: 35000,
      estimatedTimeOfWork:45,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      Task: 'Cuci Mesin Detail',
      price: 60000,
      estimatedTimeOfWork:75,
      createdAt:new Date(),
      updatedAt:new Date()
    }]);
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
