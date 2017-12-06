const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/', function(req, res){
  res.send('home')
})

router.get('/login', function(req, res){
  res.render('login')
})
router.post('/login', function(req, res){
  Model.User.findOne({
    where:{
      email:req.body.email
    }
  }).then(user=>{
    user.check_password(req.body.password,function(result){
      if(result){
        // res.send('success')
        req.session.isLogin = true
        res.redirect('/')
      }else{
        res.send('failed')
      }
    })
  })
})


router.get('/register', function(req, res){
  res.send('register')
})



module.exports = router