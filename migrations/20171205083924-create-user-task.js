'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      TaskId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      realTimeOfWork: {
        type: Sequelize.INTEGER
      },
      ownerIncome: {
        type: Sequelize.INTEGER
      },
      employeeIncome: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserTasks');
  }
};