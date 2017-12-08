const express = require('express');
const router = express.Router();
const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

router.get('/logout', function(req, res){
  req.session.isLogin = false
  res.redirect('/')
})

router.get('/:id/profile', function(req, res){
  let userId = req.params.id
  Model.User.findById(userId).then(function(data){
    // res.send(data)
    if (req.session.role == 'employee') {
      res.render('profileEmployee',{dataUser:data})
    } else if (req.session.role == 'manager') {
      res.render('profileManager',{dataUser:data})
    }
  })
})

router.get('/:id/profile/edit', function(req, res){
  let userId = req.params.id
  Model.User.findById(userId).then(function(data){
    // res.send(data)
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
  let userId = req.params.id
  Model.User.findById(userId).then(function(dataUser){
    Model.UserTask.findAll({order:[['updatedAt','DESC']],include:[Model.User,Model.Task]}).then(function(dataUserTask){
      // res.send(dataUserTask)
      res.render('ownerReport',{dataUser:dataUser, dataUserTask:dataUserTask})
    })
  })
})
router.post('/report/:id/owner', function(req, res){
  Model.UserTask.findAll({where:{createdAt:req.body.start,updatedAt:req.body.end}}).then(function(data){
    
  })
  // console.log(typeof req.body.start);
  res.send(req.body)
})


router.get('/employeeList', function(req, res){
  Model.User.findAll({where:{role:'employee'},order:[['name','ASC']]}).then(function(data){
    // res.send(data)
    res.render('employeeList',{dataUsers:data})
  })
})

router.get('/admin', function(req, res){
  if (req.session.role != 'admin') {
    res.redirect('/')
  } else {
    Model.User.findAll({order:[['name','ASC']]}).then(function(data){
      // res.send(data)
      res.render('admin',{dataUsers:data})
    })
  }
})
router.post('/admin/:id', function(req, res){
  Model.User.update({role:req.body.role},{where:{id:req.params.id}}).then(function(){
    res.redirect('/users/admin')
  })
})
router.get('/admin/:id/delete', function(req, res){
  Model.User.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/users/admin')
  })
})
router.get('/admin/logout', function(req, res){
  req.session.isLogin = false
  res.redirect('/')
})



router.get('/assignTask', function(req, res){
  //Model.User.findAll({where:{ }}) //rolenya:'employee', statusnya bukan 'idle' atau 'on progress'. Untuk nampilin dropdown user yg available
  Model.User.findAll({where:{role:'employee'},include: [Model.UserTask]}).then(function(dataUsers){
    Model.Task.findAll().then(function(dataTasks){
      Model.UserTask.findAll({include:[Model.User, Model.Task]})
      .then(function(dataUserTasks){
        // res.send(dataUsers)
        res.render('assignTask',{dataUsers:dataUsers, dataTasks:dataTasks, dataUserTasks:dataUserTasks})
      })
    })
  })
})
router.post('/assignTask', function(req, res){
  let input = {
    userId: req.body.userId,
    taskId: req.body.taskId,
    status: 'idle',
    createdBy: 'manager'
  }
  Model.UserTask.create({UserId: input.userId, TaskId: input.taskId, status: input.status, createdBy: input.createdBy}).then(function(){
    res.redirect('/users/assignTask')
  })
})

router.get('/:id/viewTask', function(req, res){
  Model.UserTask.findAll({where:{UserId: req.params.id, status: {[Sequelize.Op.ne]: 'done'}}, include:[Model.Task]}).then(function(data){
    // res.send(data)
    if (data == '') {
      res.render('viewTaskDone')
    } else if (data.status == 'on-progress') {
      res.render('viewTaskOn',{dataToday:data[0]})
    } else {
      res.render('viewTaskIdle',{dataToday:data[0]})
    }
  }).catch(function(err){
    console.log(err);
  })
})
router.post('/:idUser/viewTask/:idTask', function(req, res){
  Model.UserTask.update(req.body,{where:{UserId:req.params.idUser, TaskId: req.params.idTask}}).then(function(){
    Model.UserTask.findOne({where:{UserId:req.params.idUser, TaskId: req.params.idTask}}).then(function(data){
      if (data.status == 'on-progress') {
        Model.UserTask.update({startPoint:data.updatedAt}).then(function(){
          res.redirect(`/users/${req.params.idUser}/viewTask`)
        })
      } else if(data.status == 'done') {
        Model.UserTask.update({endPoint:data.updatedAt}).then(function(){
          res.redirect(`/users/${req.params.idUser}/viewTask`)
        })
      }
    })
  })
})


// router.get('/monitorTask', function(req, res){
//   Model.UserTask.findAll({include:[Model.User, Model.Task]})
//   .then(function(data){
//     res.render('monitorTask', {dataUserTasks:data})
//   })
// })


module.exports = router