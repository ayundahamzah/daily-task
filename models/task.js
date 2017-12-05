'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    Task: DataTypes.STRING,
    price: DataTypes.INTEGER,
    estimated - time - of -work: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Task.associate = function(models){
    Task.belongsToMany(models.User, {through:"UserTask"})
  }
  return Task;
};