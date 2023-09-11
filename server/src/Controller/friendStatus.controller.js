const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const redis=require("../../config/redis/redis.config");
const friendStatus=async(req,res,next)=>{
    const {friend}=req.query;
    try{
        const exists=await redis.get(friend)
        if(exists){
            res.status(200).json({status:true})
        }
        else{
            res.status(200).json({status:false})
        }
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=friendStatus;