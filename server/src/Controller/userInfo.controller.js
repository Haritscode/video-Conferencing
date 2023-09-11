const userDb=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const userInfo=(req,res,next)=>{
    const {email}=req.userInfo;
    userDb.query(`SELECT * FROM user WHERE email="${email}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler())
        }
        else{
            if(result.length>0)
            {
                const {email,name,profileUrl=""}=result[0];
                res.status(200).json({email,name,profileUrl});
            }
            else{
                res.cookie('atoken','',{expiresIn:0})
                res.cookie('rtoken','',{expiresIn:0})
                next(new ErrorHandler("User Not Found",401));
            }
        }
    });
}
module.exports=userInfo;