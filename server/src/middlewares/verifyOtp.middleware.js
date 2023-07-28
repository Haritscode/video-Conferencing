const dbdata=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const verifyOtp=(req,res,next)=>{
    const {email,code}=req.body;
    dbdata.query(`SELECT * FROM otp WHERE email="${email}" AND otp=${code}`,(err,result)=>{
        if(err){
            next(new ErrorHandler())
        }   
        else{
         if(result[0]){
            dbdata.query(`DELETE FROM otp WHERE email="${email}" and otp="${code}"`,(err,result)=>{
                if(err){
                    next(new ErrorHandler())
                }
                else{
                    if(result)
                    {
                        next();
                    }
                }
            })
         }
         else{
            next(new ErrorHandler("Invalid Otp",404))
         }
        }
    })
}
module.exports=verifyOtp