function checkLogin(req,res,next) {
  let login = req.session.isLogin
  let role = req.session.role
  if(login && role){
    next()
  }else{
    res.redirect('/login')
  }
  
}

module.exports = {
  checkLogin:checkLogin
};