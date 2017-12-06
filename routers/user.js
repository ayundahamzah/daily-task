const express = require('express');
const router = express.Router();
const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

router.get('/', function(req, res){
  res.send('users')
})

router.get('/:id/profile', function(req, res){
  let userId = req.params.id
  Model.User.findById(userId).then(function(data){
    // res.send(data)
    res.render('profile',{dataUser:data})
  })
})

router.get('/:id/profile/edit', function(req, res){
  let userId = req.params.id
  Model.User.findById(userId).then(function(data){
    res.render('profileEdit',{dataUser:data})
  })
})
router.post('/:id/profile/edit', function(req, res){
  let userId = req.params.id
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  Model.User.update({
    name:user.name,
    email:user.email,
    password:user.password
  },{where:{id:userId}})
  .then(function(){
    res.redirect(`/users/${userId}/profile`)
  })
})


router.get('/report/:id/employee', function(req, res){
  let userId = req.params.id
  Model.User.findById(userId).then(function(dataUser){
    Model.UserTask.findAll({where:{UserId:userId, status:'done'}, include:[Model.Task]}).then(function(dataUserTask){
      res.render('employeeReport', {dataUser:dataUser, dataUserTask:dataUserTask})
    })
  })
})

router.get('/report/:id/owner', function(req, res){
  // res.send('owner')
  res.render('ownerReport')
})

router.get('/employeeList', function(req, res){
  Model.User.findAll({where:{role:'employee'},order:[['name','ASC']]}).then(function(data){
    // res.send(data)
    res.render('employeeList',{dataUsers:data})
  })
})

router.get('/assignTask', function(req, res){
  //Model.User.findAll({where:{ }}) //rolenya:'employee', statusnya bukan 'idle' atau 'on progress'. Untuk nampilin dropdown user yg available
  Model.User.findAll({include: [Model.UserTask]}).then(function(dataUsers){
    Model.Task.findAll().then(function(dataTasks){
      // res.send(dataUsers)
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


router.get('/:idUser/viewTask/:idTask', function(req, res){
  Model.UserTask.findAll({where:{UserId: req.params.idUser,TaskId:req.params.idTask, status: {[Sequelize.Op.ne]: 'done'}}}).then(function(dataUserTasks){
    Model.Task.find({where:{id:req.params.idTask}}).then(function(dataTask){
      res.render('viewTask',{dataToday:dataUserTasks[0], dataTask:dataTask})
    })
  })
})
router.post('/:idUser/viewTask/:idTask', function(req, res){
  Model.UserTask.update(req.body,{where:{UserId:req.params.idUser, TaskId: req.params.idTask}}).then(function(){
    res.redirect(`/users/${req.params.idUser}/viewTask/${req.params.idTask}`)
  })
})


router.get('/monitorTask', function(req, res){
  Model.UserTask.findAll({include:[Model.User, Model.Task]})
  .then(function(data){
    res.render('monitorTask', {dataUserTasks:data})
  })
})


module.exports = router