const db=require("../../config/db/config");
const redis=require("../../config/redis/redis.config");
const charRequests=(sendBy,sendTo,callback,socket)=>{
    if(sendBy==sendTo){
        callback({status:209,msg:"Can't send request to yourself"})
    }
    else{

        db.query(`select * from invitations where sendBy="${sendTo}" and sendTo="${sendBy}"`,(err,result)=>{
            if(err){
            callback({status:500,msg:"Internal Server Error"});
        }
        else{
            if(result.length===0)
            {
                db.query(`select * from invitations where sendBy="${sendBy}" and sendTo="${sendTo}"`,(err,result)=>{
                    if(err){
                        callback({status:500,msg:"Internal Server Error"});
                    }
                    else{
                        if(result.length===0){
                            db.query(`insert into invitations (sendBy,sendTo) value ("${sendBy}","${sendTo}")`,async(err,result)=>{
                                if(err){
                                    callback({status:500,msg:"Internal Server Error"});
                                }
                                else if(result.affectedRows===1)
                                {
                                    let userSocketId=await redis.get(sendTo);
                                    if(userSocketId){
                                        db.query(`select email,name,profileUrl from user where email="${sendBy}"`,(err,result)=>{
                                            if(err)
                                            {
                                                callback({status:500,msg:"Internal Server Error"});
                                            }
                                            else{
                                                if(result.length>0)
                                                {
                                                    socket.to(userSocketId).emit("newFriendRequest",result[0],(response)=>{
                                                        console.log("okkk");
                                                    })
                                                }
                                            }
                                        })
                                    }
                                    // check user is online or not;
                                    callback({status:201,msg:"request already sended"})
                                }
                            })
                        }
                        else if(result.length>0){
                            callback({status:409,msg:"request already sended"})
                        }
                    }
                })
            }
            else if(result.length>0){
                callback({status:409,msg:"arived request"})
            }
        }

    })}
}
module.exports=charRequests;