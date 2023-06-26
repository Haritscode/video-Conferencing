const dbconnect=require("../../config/config")
const isUserExists=(req,res,next)=>{
        try{
            const {email,password}=req.body;
            if(email.length && password)
            {
                dbconnect.query(`SELECT * FROM user WHERE email="${email}" AND password="${password}" `,(err,result)=>{
                    if(err){
                        throw new Error(err.Error);
                    }
                    else{
                        if(result[0])
                        {
                            next();
                        }
                        else{
                            dbconnect.query(`SELECT * FROM user WHERE email="${email}"`,(err,result)=>{
                                if(err)
                                {
                                    throw new Error(err.Error);
                                }
                                else{
                                    if(result[0])
                                    {
                                        res.status(401).json({msg:"Unauthorized user"});
                                    }
                                    else{
                                        res.status(404).json({msg:"User Not Found"})
                                    }
                                }
                            })
                        }
                    }
                })
            }
            else{
                throw new Error("Email or password is incorrect")
            }
        }
        catch(err){
            console.log(err);
        }
}
module.exports=isUserExists;