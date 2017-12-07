'use strict';
const bcrypt = require('bcrypt')
// const hash = bcrypt.hashSync(myPlaintextPassword, salt)
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  });
  
  User.beforeCreate((user,option)=>{
    return bcrypt.hash(user.password,5).then(hash=>{
      user.password=hash
    })
  })
  
  User.prototype.check_password = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password).then(function(res) {
      console.log(res)
      cb(res)
    })
    .catch(err => console.log(err))
  }
  
  
  User.associate = function(models){
    User.belongsToMany(models.Task, {through:"UserTask"})
    User.hasMany(models.UserTask)
  }
  return User;
};