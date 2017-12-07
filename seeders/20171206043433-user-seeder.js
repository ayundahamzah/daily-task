'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'employee1@mail.com',
      password: 'employee1',
      name: 'Employee No.1',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee2@mail.com',
      password: 'employee2',
      name: 'Employee No.2',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee3@mail.com',
      password: 'employee3',
      name: 'Employee No.3',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee4@mail.com',
      password: 'employee4',
      name: 'Employee No.4',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee5@mail.com',
      password: 'employee5',
      name: 'Employee No.5',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee6@mail.com',
      password: 'employee6',
      name: 'Employee No.6',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee7@mail.com',
      password: 'employee7',
      name: 'Employee No.7',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee8@mail.com',
      password: 'employee8',
      name: 'Employee No.8',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    },{
      email: 'employee9@mail.com',
      password: 'employee9',
      name: 'Employee No.9',
      role: 'employee',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
