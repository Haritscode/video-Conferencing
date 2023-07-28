const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const findUser=(req,res,next)=>{
    const {userEmail,searchUserByEmail}=req.body;
    db.query(`select email,name,profileUrl from user where email="${searchUserByEmail}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else{
            if(result.length===0){
                next(new ErrorHandler("User Not Found",404));
            }
            else if(result.length>0){

                res.status(200).json(result[0])
            }
        }
    })
}
module.exports=findUser;