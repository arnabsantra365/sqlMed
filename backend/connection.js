const sql =  require ('mysql');
require('dotenv').config()
const connect = sql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

module.exports=connect;