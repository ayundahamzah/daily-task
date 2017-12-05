'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTask = sequelize.define('UserTask', {
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    real - time - of -work: DataTypes.INTEGER,
    owner - income: DataTypes.INTEGER,
    employee - income: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserTask;
};