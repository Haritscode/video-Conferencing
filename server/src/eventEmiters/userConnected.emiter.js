const db=require("../../config/db/config")
const userConnected=async(email,callback,socket)=>{
    db.query(`select uid from user where email="${email}"`,(err,result)=>{
        if(err){
            callback({status:500,msg:"Internal Server Error"});
        }
        else if(result.length>0){
            const userId=result[0].uid;
            db.query(`select senderId from connections where receiverId="${userId}"`,(err,result)=>{
                if(err){
                    callback({status:500,msg:"Internal Server Error"});
                }
                else{
                    if(result.length===0){
                        callback({status:404,msgL:"no request found"});
                    }
                    else if(result.length>0){
                        let resultData=[];
                        result.map(({senderId},count)=>{
                            db.query(`select user.email,user.name,user.profileUrl from user inner join connections on user.uid=connections.senderId where user.uid="${senderId}" and connections.status="requested"`,(err,result1)=>{
                                if(err){
                                    callback({status:500,msg:"Internal Server Error"});
                                }
                                else if(result1.length>0){
                                    resultData.push(result1[0]);
                                    if(count===result.length-1){
                                        callback({status:200,requests:resultData})
                                    }
                                }
                                else{
                                    callback({status:200,requests:resultData})
                                }
                            })
                        })
                    }
                }
            })
        }
    })
}
module.exports=userConnected;