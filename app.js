const express=require('express');
const app = express();
const bodyParser =require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.set('views','./views')
app.set('view engine','ejs')

// app.get('/',function(req,res){
//   res.send('alive')
// })










app.listen(3000)