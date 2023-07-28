const jwt=require("jsonwebtoken");
const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
require("dotenv").config();
const Token=(req,res)=>{
    try{
        const {email}=req.body;
        db.query(`select * from user where email="${email}"`,(err,result)=>{
            if(err){
                next(new ErrorHandler("Internal Server Error",500));
            }
            else{
                const refreshToken=jwt.sign({email:result[0].email,id:result[0].uid},`${process.env.REFRESHTOKENPRIVATEKEY}`,{expiresIn:"60d"});
                const accessToken=jwt.sign({email},`${process.env.ACCESSTOKENPRIVATEKEY}`,{expiresIn:'6h'});
                res.cookie('rtoken',`Bearer ${refreshToken}`,{maxAge:1000*60*60*24*60,secure:true});
                res.cookie('atoken',`Bearer ${accessToken}`,{maxAge:1000*60*60*6,secure:true});
                res.status(200).json({name:result[0].name,email:result[0].email,profileUrl:result[0].profileUrl})
            }
        })
    }
    catch(err){
        next(new ErrorHandler())
    }
} 

const verifyToken=(req,res,next)=>{
    try{
        const token=req.cookies;
        let {atoken,rtoken}=token;
        rtoken=rtoken?rtoken.split(" ")[1]:"";
        atoken=atoken?atoken.split(" ")[1]:"";
        if(atoken.length>0 && rtoken.length>0)
        {
            jwt.verify(atoken,process.env.ACCESSTOKENPRIVATEKEY,(err,decoded)=>{
                if(err){
                    next(new ErrorHandler("Unauthorized User",401))
                }
                else{
                    req.userInfo={email:decoded.email};
                    next();
                }
            })
        }
        else if(atoken.length==0 && rtoken.length>0){
            jwt.verify(rtoken,process.env.REFRESHTOKENPRIVATEKEY,(err,decoded)=>{
                if(err){
                    next(new ErrorHandler("Unauthorized User",401))
                }
                else{
                    const {email}=decoded;
                    const atoken=jwt.sign({email},`${process.env.ACCESSTOKENPRIVATEKEY}`,{expiresIn:'6h'});
                    res.cookie('atoken',`Bearer ${atoken}`,{maxAge:1000*60*60*6});
                    req.userInfo={email};
                    next();
                }
            })

        }
        else if(atoken?.length==0 && rtoken?.length==0)
        {
            next(new ErrorHandler("Unauthorized User",401));
        }
    }
    catch(err){
        next(new ErrorHandler())
    }
}
module.exports={ Token,verifyToken };