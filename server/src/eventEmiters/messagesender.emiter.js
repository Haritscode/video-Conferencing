const db=require("../../config/db/config");
const redis=require("../../config/redis/redis.config");
const messageEmitHandler=(sendBy,sendTo,message,callback,socket)=>{
    db.query(`select uid,name,profileUrl from user where email="${sendBy}"`,(err,senderData)=>{
        if(err){
            return callback({status:500})
        }
        else if(senderData.length>0){
            const senderId=senderData[0].uid;
            db.query(`select uid from user where email="${sendTo}"`,(err,receiverData)=>{
                if(err){
                    return callback({status:500})
                }
                else if(receiverData.length>0){
                    const receiverId=receiverData[0].uid;
                    const createdAt=Date.now();
                    db.query(`insert into messages (sendBy,sendTo,message,timeTimeStamp) value ("${senderId}","${receiverId}","${message}",${createdAt})`,async(err,result)=>{
                        if(err){
                            return callback({status:500})
                        }
                        else if(result.affectedRows===1){
                                    const receiverSockerId=await redis.get(sendTo);
                                    if(result.affectedRows>0){
                                        const {name,profleUrl}=senderData[0];
                                        try{
                                            console.log({receiverSockerId});
                                            socket.to(receiverSockerId).emit("ReceivedMessage",sendBy,name,profleUrl,message,createdAt,(response)=>{
                                            console.log({response});
                                        })
                                        return callback({status:200});
                                    }
                                    catch(err){
                                        return callback({status:500})
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
    )
}
module.exports=messageEmitHandler;