const ErrorHandler = require("../../config/errorHandler/customErrorHandler")

const googleLoginSuccess=(req,res)=>{
    if(req.user){
        res.status(200).json({
          error:false,
          message:"Successfully Logged In",
          user:req.user,
        })
    }
    else{
        next(new ErrorHandler('Not Authorizes',403))
    }
}
const googleLoginFail=(req,res)=>{
    next(new ErrorHandler("Log In failure",401));
}
module.exports={googleLoginSuccess,googleLoginFail}
