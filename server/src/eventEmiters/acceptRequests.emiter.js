const db=require("../../config/db/config");
const redis=require('../../config/redis/redis.config');
const acceptRequest=async(acceptedBy,acceptedFor,status,callback,socket)=>{
    const clientId=await redis.get(acceptedFor);
    db.query(`select uid from user where email="${acceptedBy}"`,(err,result)=>{
        if(err){    
            callback({status:500,msg:"Internal Server Error"});
        }
        else if(result.length>0){
            const accepterId=result[0].uid;
            db.query(`select uid from user where email="${acceptedFor}"`,(err,result)=>{
                if(err){
                    callback({status:500,msg:"Internal Server Error"});
                }
                else if(result.length>0){
                    const requesterId=result[0].uid;
                    db.query(`select senderId,receiverId,status from connections where senderId="${requesterId}" and receiverId="${accepterId}" and status="requested"`,(err,result)=>{
                        if(err){
                            callback({status:500,msg:"Internal Server Error"});
                        }
                        else if(result.length==0){
                            callback({status:404,msg:"Not Found"});
                        }
                        else if(result.length>0)
                        {
                            if(status==="accepted")
                            {
                                db.query(`update connections set status="${status}" where senderId="${requesterId}" and receiverId="${accepterId}"`,(err,result)=>{
                                    if(err){
                                        callback({status:500,msg:"Internal Server Error"})
                                    }
                                    else{
                                        if(result.affectedRows===1 && result.changedRows==1){
                
                                            socket.to(clientId).emit("requestUpdate","connected")
                                            callback({status:200})
                                        }
                                    }
                                })
                            }
                            else{
                                db.query(`delete from connections where senderId="${requesterId}" and receiverId="${accepterId}"`,(err,result)=>{
                                    if(err){
                                        callback({status:500,msg:"Internal Server Error"})
                                    }
                                    else{
                                        if(result.affectedRows===1){
                                            socket.to(clientId).emit("requestUpdate","new");
                                            callback({status:200})
                                        }
                                    }
                                })
                            }
                        }
                    });
                }
            })
        }
    })
}
module.exports=acceptRequest;