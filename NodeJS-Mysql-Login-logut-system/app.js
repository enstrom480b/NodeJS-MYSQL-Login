var express=require('express')
var path=require('path')
var exphbs=require('express-handlebars')
var flash=require('express-flash')
var session=require('express-session')
var expressvalidator=require('express-validator')
var bodyparser=require('body-parser')
var passport=require('passport')
var {check,validation}=require('express-validator')
var app=express()
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}))
app.set('view engine','handlebars')
app.use(express.static(path.join(__dirname,'public')))
var index=require('./routes/index')
var users=require('./routes/users')

var cookieparser=require('cookie-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())
app.use(express.json())

app.use('/',index)
app.use('/users',users)




var port=3000
app.listen(port,function(){
	console.log('Server started on port ' + port)
})

