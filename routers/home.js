const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/', function(req, res){
  // res.send('home')
  res.render('home')
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
        // req.session.id = user.id
        req.session.role = user.role
        // res.send(req.session)
        // console.log(req.session);
        if(req.session.role == 'admin'){
          res.redirect('/users/admin')
        } else {
          res.redirect(`/users/${user.id}/profile`)
        }
      }
      // else{
      //   res.send('failed')
      // }
    })
    }).catch(function(err){
      console.log(err);
      res.send(err)
  })
})


router.get('/register', function(req, res){
  res.render('register')
})
router.post('/register', function(req, res){
  Model.User.create({email:req.body.email,password:req.body.password,name:req.body.name,role:null}).then(function(){
    res.redirect('/login')
  })
})



module.exports = router