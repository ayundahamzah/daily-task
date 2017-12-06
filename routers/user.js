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
  res.send('edit')
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
  // res.send('assignTask')
  res.render('assignTask')
})

router.get('/viewTask', function(req, res){
  // res.send('viewTask')
  res.render('viewTask')
})

router.get('/monitorTask', function(req, res){
  // res.send('monitorTask')
  res.render('monitorTask')
})


module.exports = router