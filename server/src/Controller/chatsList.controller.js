const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const chatList=(req,res,next)=>{
    const {email,id}=req.userInfo;
    db.query(`SELECT DISTINCT u.uid, u.name, u.email, m.sendBy as sender, m.message as message, m.createdAt AS latestMessageTime FROM user u LEFT JOIN (SELECT CASE WHEN sendBy = '${id}' THEN sendTo WHEN sendTo = '${id}' THEN sendBy END AS conversation_user,MAX(timeTimeStamp) AS latestTime FROM messages WHERE sendBy = '${id}' OR sendTo = '${id}' GROUP BY conversation_user) AS latestMsg ON u.uid = latestMsg.conversation_user LEFT JOIN messages m ON ((u.uid = m.sendTo AND latestMsg.latestTime = m.timeTimeStamp AND m.sendBy = '${id}')OR (u.uid = m.sendBy AND latestMsg.latestTime = m.timeTimeStamp AND m.sendTo = '${id}'))WHERE u.uid != '${id}' AND m.id IS NOT NULL ORDER BY latestMessageTime DESC;
    `,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else{
            res.status(200).send(result);
        }
    })
}
module.exports=chatList
