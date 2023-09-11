const db=require("../../config/db/config");
const redis=require("../../config/redis/redis.config");
const Requests=async(sendBy,sendTo,callback,socket)=>{
    console.log({sendBy,sendTo});
    if(sendBy==sendTo){
        callback({status:209,msg:"Can't send request to yourself"})
    }
    else{
        db.query(`select uid from user where email="${sendBy}"`,(err,result)=>{
            if(err){
                callback({status:500,msg:"Internal Server Error"});
            }
            else if(result.length>0){
                const senderId=result[0].uid;
                db.query(`select uid from user where email="${sendTo}"`,(err,result)=>{
                    if(err){
                        callback({status:500,msg:"Internal Server Error"});
                    }
                    else if(result.length>0){
                        const receiverId=result[0].uid;
                        db.query(`select * from connections where receiverId="${senderId}" and senderId="${receiverId}"`,(err,result)=>{
                        if(err){
                            callback({status:500,msg:"Internal Server Error"});
                        }
                        else{
                            if(result.length===0)
                            {
                                db.query(`select senderId,receiverId,status from connections where receiverId="${receiverId}" and senderId="${senderId}"`,(err,result)=>{
                                    if(err){
                                        callback({status:500,msg:"Internal Server Error"});
                                    }
                                    else{
                                        if(result.length===0){
                                            db.query(`insert into connections (senderId,receiverId) value ("${senderId}","${receiverId}")`,async(err,result)=>{
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
                                                                    console.log(result[0]);
                                                                    socket.to(userSocketId).emit("newFriendRequest",result[0]);
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
                    })
                }
            })
        }
    })}
}
module.exports=Requests;