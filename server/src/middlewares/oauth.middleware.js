const db=require("../../config/db/config");
const { default: ShortUniqueId } = require("short-unique-id");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const uid = new ShortUniqueId({ length: 8 });
const oauth=(req,res,next)=>{
    const id = uid();
    const {type} = req.params;
    req.body={
        name:req.user._json.name,
        email:req.user._json.email,
        password:req?.user?._json.email?.split("@")[0],
        type:"oauth20"
    }
    try{
        db.query(`SELECT * FROM user WHERE email="${req?.body?.email}"`,(err,result)=>{
            if(err){
                next(new ErrorHandler("Some Server Error",404));
            }
            else{
                if(result?.length===0)
                {
                    db.query(`INSERT INTO user (uid,name,email,password) VALUES ('${id}','${req.body.name}','${req.body.email}','${req.body.password}')`,(err,result1)=>{
                        if(err)
                        {
                            next(new ErrorHandler("Some Server Error",404));
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
        console.log(err);
        next(new ErrorHandler())
    }
}
module.exports=oauth;