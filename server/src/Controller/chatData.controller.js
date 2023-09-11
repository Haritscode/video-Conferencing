const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const chatData=(req,res,next)=>{
    const userInfo=req.userInfo;
    const chatTo=req.query.of;
    db.query(`select uid,email from user where email="${chatTo}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else{
            const {uid,email}=result[0];
            db.query(`select m.message,u.email as sender,u.name,m.createdAt from messages m join user u on u.uid=m.sendBy where (m.sendBy="${userInfo.id}" and m.sendTo="${uid}") or (m.sendBy="${uid}" and m.sendTo="${userInfo.id}") order by timeTimeStamp desc limit 15`,(err,result)=>{
                if(err){
                    next(new ErrorHandler())
                }
                else if(result.length>0){
                    let data=result.map((item)=>{
                        if(item.sender===userInfo.email){
                            return {sendBy:userInfo.email,sendTo:email,msg:item.message,createdAt:item.createdAt,name:item.name}
                        }
                        else{
                            return {sendBy:email,sendTo:userInfo.email,msg:item.message,createdAt:item.createdAt,name:item.name}
                        }
                    })
                    let newData=[]
                    const resultLength=result.length;
                    for(let i=0;i<resultLength;i++){
                        newData[i]=data[resultLength-1-i]
                    }
                    res.status(200).send(newData);
                }
            })
        }
    })
}
module.exports=chatData;