const db=require("../../config/db/config")
const redis=require("../../config/redis/redis.config");
const userConnected=async(email,callback)=>{
    db.query(`select sendBy from invitations where sendTo="${email}"`,(err,result)=>{
        if(err){
            callback({status:500,msg:"Internal Server Error"});
        }
        else{
            if(result.length===0){
                callback({status:404,msgL:"no request found"});
            }
            else if(result.length>0){
                let resultData=[];
                result.map(({sendBy},count)=>{
                    db.query(`select user.email,user.name,user.profileUrl from user inner join invitations on user.email=invitations.sendBy where user.email="${sendBy}"`,(err,result1)=>{
                        if(err){
                            callback({status:500,msg:"Internal Server Error"});
                        }
                        else if(result1){
                            resultData.push({...result1[0]});
                            if(count+1===result.length){
                                callback({status:200,requests:resultData})
                            }
                        }
                    })
                })
            }

        }

    })
        
}
module.exports=userConnected;