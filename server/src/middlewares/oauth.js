const db=require("../../config/config");
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 8 });
const oauth=(req,res,next)=>{
    const id = uid();
    req.body={
        name:req.user._json.name,
        email:req.user._json.email,
        password:req?.user?._json.email?.split("@")[0],
        type:"oauth20"
    }
    try{
        db.query(`SELECT * FROM user WHERE email="${req?.body?.email}"`,(err,result)=>{
            if(err){
                res.status(404).json({msg:"Some Server Error"});
            }
            else{
                if(result?.length===0)
                {
                    db.query(`INSERT INTO user (uid,name,email,password) VALUES ('${id}','${req.body.name}','${req.body.email}','${req.body.password}')`,(err,result1)=>{
                        if(err)
                        {
                            res.status(404).json({msg:"Some Server Error"});
                        }
                        else{
                            if(result1?.affectedRows==1)
                            {
                                next();
                            }
                        }
                    });
                }
                else{
                    next();
                }
            }
        })
    }
    catch(err){

    }
    next();
}
module.exports=oauth;