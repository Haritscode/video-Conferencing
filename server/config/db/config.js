const mysql=require("mysql2");
const connect=mysql.createConnection({
        host:"conferencing_app_db",
        user:"root",
        database: 'conferencing_db',
        password: "Harit1273#"
    
    }).setMaxListeners(10)
    connect.connect(err=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("db connected Successfully");
        }
    })
module.exports=connect;