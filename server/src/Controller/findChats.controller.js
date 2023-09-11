const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const findChat=(req,res,next)=>{
    const {searchByEmail}=req.body;
    const {email,id}=req.userInfo;
    db.query(`select * from connections where senderId="${email}" and receiverId like "${searchByEmail}%" and status="accepted"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(result.length===0){
            db.query(`select * from connections where senderId like "${searchByEmail}%" and receiverId="${email}" and status="accepted"`,(err,result)=>{
                if(err){
                    next(new ErrorHandler());
                }
                else{   
                    res.status(200).send(result)
                }
            })
        }
        else
        {
            res.status(200).send(result)
        }
    })
}
module.exports=findChat;