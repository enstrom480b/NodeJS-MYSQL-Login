var express=require('express')
var router=express.Router()
var db=require('../mysqlconn')
var jwt=require('jsonwebtoken')
var bcrypt=require('bcryptjs')
const bodyParser=require('body-parser')
const urlencodedParser=bodyParser.urlencoded({extended:false})
const {body,validationResult}=require('express-validator')

router.get('/register',function(req,res){
	
	res.render('register')
})
router.get('/login',function(req,res){
	
	res.render('login')
})
router.post('/login',function(req,res){
	
	const {email,password}=req.body

	if(!email || !password)
	{
		return res.status(400).render('login',{
			message:'Please provide an email and password'
		})
		
	}
	db.query('SELECT *FROM users WHERE email=?',[email],async function(err,results){
		
		if(!results || !(await bcrypt.compare(password,results[0].password)))
		{
			console.log(results[0].password)
		res.status(401).render('login',{
			message:'Email or Password is incorrect'
		})
		}
		else{
			
			const id=results[0].id
			const token=jwt.sign({id},process.env.JWT_SECRET,{
				expiresIn:process.env.JWT_EXPIRES_IN
			})
		const cookieOptions={
			expires:new Date(
			Date.now()+process.env.JWT_COOKIE_EXPIRES*24*24*60*1000
			),
			httpOnly:true		
		}
res.cookie('jwt',token,cookieOptions)
res.status(200).redirect("/")
		}	
	})
})
router.post('/register', function(req,res){
const {username,email,password,passwordConfirm}=req.body
console.log(username,email,password,passwordConfirm)
db.query("select email FROM users WHERE email=?",[email],async function(error,results)
{

if(error)
{
	console.log(error)
}

if(results.length>0)
{
	return res.render('register',{
		message:'That email is not available'
	})
}

else if(password!==passwordConfirm)
{
	return res.render('register',{
		message:'Passwords don\'t match'
})

}
let hashedPassword=await bcrypt.hash(password,8)
db.query('INSERT INTO users SET ?',{name:username,email:email,password:hashedPassword},(err,results)=>{
if(err)
{
	console.log(err)
}
else{
	return res.render('register',{
		message:'user registered'
	})

}

})
res.send('send')
})

})
	



module.exports=router