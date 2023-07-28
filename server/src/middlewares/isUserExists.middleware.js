const dbconnect=require("../../config/db/config")
const bcrypt=require("bcrypt");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const isUserExists=(req,res,next)=>{
        try{
            const {email,password}=req.body;
            if(email && password)
            {
                dbconnect.query(`SELECT * FROM user WHERE email="${email}"`,(err,result)=>{
                    if(err){
                        next(new ErrorHandler())
                    }
                    else{
                        if(result[0])
                        {
                            const savedData=result[0];
                            bcrypt.compare(password,savedData.password,(err,same)=>{
                                if(same)
                                {
                                    req.userDetails=result[0];
-                                   next();
                                }
                                else{
                                    next(new ErrorHandler("Unauthorized User",401))
                                }
                            })
                        }
                        else{
                            res.status(404).json({messsage:"user not found"})
                        }
                    }
                })
            }
            else{
                next(new ErrorHandler("Email or Password is Incorrent",401))
            }
        }
        catch(err){
            next(new ErrorHandler())
        }
}
module.exports=isUserExists;