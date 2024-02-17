const db=require("../../config/db/config")
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const { logger } = require("../../config/nodemailer/nodemailer.config");
const redis=require("../../config/redis/redis.config")
const connectionStatus=(socket)=>{
    db.query(`SELECT u.email FROM connections c JOIN user u ON (c.senderId = "${socket.userData}" AND c.receiverId = u.uid) OR (c.receiverId = "${socket.userData}" AND c.senderId = u.uid) WHERE c.senderId = "${socket.userData}" OR c.receiverId = "${socket.userData}"`,async(err,result)=>{
        if(err){
            new ErrorHandler();
        }
        else if(result.length>0){
            let users=[]
            result.map(({email})=>{
                users.push(email)
            })
            const usersocketIds=await redis.mGet(users);
            users=[]
            usersocketIds.map(item=>{
                if(item){
                    users.push(item);
                }
            })
            console.log(true)
            socket.to(users).emit("chatStatus",{status:true})
        }
    })
}
module.exports=connectionStatus;