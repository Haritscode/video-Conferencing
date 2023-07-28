require("dotenv").config;
const jwt=require("jsonwebtoken")
const verifyHandshake=(atoken,rtoken,next)=>{
    try{
        if(atoken.length>0 && rtoken.length>0)
        {
            jwt.verify(atoken,process.env.ACCESSTOKENPRIVATEKEY,(err,decoded)=>{
                if(err){
                    return next(new Error("Internal Server Error"))
                }
                else{
                    next();
                }
            })
        }
        else if(atoken.length==0 && rtoken.length>0){
            jwt.verify(rtoken,process.env.REFRESHTOKENPRIVATEKEY,(err,decoded)=>{
                if(err){
                    return next(new Error("Internal Server Error"))
                }
                else{
                    const {email,id}=decoded;
                    const atoken=jwt.sign({email},`${process.env.ACCESSTOKENPRIVATEKEY}`,{expiresIn:'6h'});
                    res.cookie('atoken',`Bearer ${atoken}`,{maxAge:1000*60*60*6});
                    next()
                }
            })

        }
        else if(atoken?.length==0 && rtoken?.length==0)
        {
            return next(new Error("Internal Server Error"))
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports=verifyHandshake;