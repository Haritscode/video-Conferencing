const db=require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const findUser=(req,res,next)=>{
    const {find}=req.query;
    const {email}=req.userInfo;
    try{
        db.query(`select uid from user where email="${email}"`,(err,result)=>{
            if(err){
                next(new ErrorHandler())
            }
            else if(result.length>0){
                const userId=result[0].uid;
                db.query(`select uid,email,name,profileUrl from user where email like "${find}%"`,(err,userInfo)=>{
                    if(err){
                        next(new ErrorHandler())
                    }
                    else{
                        if(userInfo.length===0)
                        {
                            next(new ErrorHandler("user not found",404));
                        }
                        else if(userInfo.length>0){
                            const findId=userInfo[0].uid;
                            db.query(`select senderId,receiverId,status from connections where senderId="${userId}" and receiverId="${findId}"`,(err,result)=>{
                                if(err){
                                    next(new ErrorHandler());
                                }
                                else{
                                    if(result.length===0)
                                    {
                                        db.query(`select senderId,receiverId,status from connections where senderId="${findId}" and receiverId="${userId}"`,(err,result)=>{
                                            if(err){
                                                next(new ErrorHandler());
                                            }
                                            else{
                                                if(result.length===0){
                                                    res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"new"});
                                                }
                                                else if(result.length>0){
                                                    if(result[0].status==="requested")
                                                    {
                                                        res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"arived request"});
                                                    }
                                                    else if(result[0].status==="accepted"){
                                                        res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"connected"});
                                                    }
                                                    else if(result[0].status==="decline"){
                                                        res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"new"});
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    else if(result.length>0){
                                        if(result[0].status==="requested"){
                                            res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"request already sended"});
                                        }
                                        else if(result[0].status==="accepted"){
                                            res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"connected"});
                                        }
                                        else if(result[0].status==="decline"){
                                            res.status(200).json({email:userInfo[0].email,profileUrl:userInfo[0].profileUrl,name:userInfo[0].name,type:"new"});
                                        }
                                    }
                                }
                            })
                    }
                }
            })
            }
        })
    }
    catch(err){
        callback({status:500,msg:"Internal Server Error"})
    }
}
module.exports=findUser;


// foundtypes:{
    // 0: "new connecton",
    // 1: "request received",
    // 2: "request send"
// }