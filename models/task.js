'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    Task: DataTypes.STRING,
    price: DataTypes.INTEGER,
    estimatedTimeOfWork: DataTypes.INTEGER
  });
  Task.associate = function(models){
    Task.belongsToMany(models.User, {through:"UserTask"})
  }
  
  return Task;
};