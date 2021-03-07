var dotenv=require('dotenv')
var path=require('path')
dotenv.config({path:'./.env'})
const db=mysql.createConnection({
	host:process.env.DATABASE_HOST
	user:process.env.DATABASE_USER
	password:process.DATABASE_PASSWORD
	database:process.env.DATABASE
})

module.exports=db