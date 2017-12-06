'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('UserTasks','startPoint',{type:Sequelize.STRING});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('UserTasks','startPoint');
  }
};
