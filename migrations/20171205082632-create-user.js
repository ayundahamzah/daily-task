'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
         type : DataTypes.STRING,
         validate : {
           notEmpty: {
             msg: "Maaf Email Tidak Boleh Kosong"
           },
           isEmail: {
             msg : "Maaf Format Email Anda Salah"
           },
           isUnique: function(value,next){
             let self = this
             Student.find({
               where:{
                 email:value,
                 id:{[sequelize.Op.ne]:self.id}
               }
             }).then(student=>{
               if(student){
                 return next('Maaf, email sudah terdaftar!')
               }else{
                 next()  
               }
             }).catch(err=>{
               return next(err)
             })
           }
         }
       },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};