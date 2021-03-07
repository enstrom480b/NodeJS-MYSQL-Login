var dotenv=require('dotenv')
var path=require('path')
dotenv.config({path:'./.env'})
var mysql=require('mysql')
const db=mysql.createConnection({
	host:process.env.DATABASE_HOST,
	user:process.env.DATABASE_USER,
	password:process.DATABASE_PASSWORD,
	database:process.env.DATABASE
})

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('MYSQL Connected connected as id ' + db.threadId);
})


module.exports=db