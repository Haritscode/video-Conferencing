const jwt=require("jsonwebtoken");
require("dotenv").config();
const Token=(req,res)=>{
    try{

        const {email,password}=req.body;
        const accessToken=jwt.sign({email:email},`${process.env.ACCESSTOKENPRIVATEKEY}`,{expiresIn:'60d'});
        const refreshToken=jwt.sign({email:email,password:password},`${process.env.REFRESHTOKENPRIVATEKEY}`,{expiresIn:"3600s"});
        res.cookie('rtoken',`Bearer ${refreshToken}`,{expiresIn:'60d'}).cookie('atoken',`Bearer ${accessToken}`,{expiresIn:"3600s"});
        if(req?.body?.type)
        {
            res.redirect("http://localhost:3000");
        }
        else{
            res.status(200).json("success");
        }
    }
    catch(err){
        console.log(err);
    }
} 
const verifyToken=(req,res,next)=>{
    try{
        let { atoken,rtoken }=req.cookies;
        atoken=atoken && atoken?.split(" ")[1];
        rtoken=rtoken && rtoken?.split(" ")[1];
        jwt.verify(atoken,process.env.ACCESSTOKENPRIVATEKEY,(err,user)=>{
            if(err) res.status(401).json(err);
            else {
                req.userId=user.email
                next();
            };
        })
    }
    catch(err){
        console.log(err);
    }
}
module.exports={ Token,verifyToken };