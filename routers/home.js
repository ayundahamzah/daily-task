const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function(req, res){
  res.send('home')
})

router.get('/login', function(req, res){
  res.send('login')
})

router.get('/register', function(req, res){
  res.send('register')
})



module.exports = router