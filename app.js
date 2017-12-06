const express=require('express');
const app = express();
const bodyParser =require('body-parser')

const home = require('./routers/home.js');
const user = require('./routers/user.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.set('views','./views')
app.set('view engine','ejs')

// app.get('/',function(req,res){
//   res.send('alive')
// })

app.use('/',home)
app.use('/users',user)








app.listen(3000)