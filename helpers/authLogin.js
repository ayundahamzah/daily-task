function checkLogin(req,res,next) {
  let login = req.session.isLogin
  if(login){
    next()
  }else{
    res.redirect('/login')
  }
  
}

module.exports = {
  checkLogin:checkLogin
};