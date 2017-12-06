'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTask = sequelize.define('UserTask', {
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    realTimeOfWork: DataTypes.INTEGER,
    ownerIncome: DataTypes.INTEGER,
    employeeIncome: DataTypes.INTEGER,
    createdBy:DataTypes.STRING,
    startPoint:DataTypes.STRING,
    endPoint:DataTypes.STRING
  });
  UserTask.associate = function(models){
    UserTask.belongsTo(models.Task)
    UserTask.belongsTo(models.Task)
  }
  return UserTask;
};