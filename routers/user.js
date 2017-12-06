const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function(req, res){
  res.send('users')
})

router.get('/profile', function(req, res){
  // res.send('profile')
  res.render('profile')
})

router.get('/profile/:id/edit', function(req, res){
  // res.send('edit')
  res.render('profileEdit')
})

router.get('/report/:id/employee', function(req, res){
  // res.send('employee')
  res.render('employeeReport', {id:req.params.id})
})

router.get('/report/:id/owner', function(req, res){
  // res.send('owner')
  res.render('ownerReport')
})

router.get('/employeeList', function(req, res){
  // res.send('employeeList')
  res.render('employeeList')
})

router.get('/assignTask', function(req, res){
  //Model.User.findAll({where:{ }}) //rolenya:'employee', statusnya bukan 'idle' atau 'on progress'. Untuk nampilin dropdown user yg available
  Model.User.findAll().then(function(dataUsers){
    Model.Task.findAll().then(function(dataTasks){
      // res.send(data)
      res.render('assignTask',{dataUsers:dataUsers, dataTasks:dataTasks})
    })
  })
})
router.post('/assignTask', function(req, res){
  let input = {
    userId: req.body.userId,
    taskId: req.body.taskId,
    status: 'idle',
    createdBy: 'Owner'
  }
  Model.UserTask.create({UserId: input.userId, TaskId: input.taskId, status: input.status, createdBy: input.createdBy}).then(function(){
    res.redirect('/users/assignTask')
  })
})


router.get('/viewTask', function(req, res){
  // res.send('viewTask')
  res.render('viewTask')
})

router.get('/monitorTask', function(req, res){
  Model.UserTask.findAll({include:[Model.User, Model.Task]})
  .then(function(data){
    // res.send(data)
    res.render('monitorTask', {dataUserTasks:data})
  })
})


module.exports = router