const db=require("../../config/db/config");
const findUser=(email,searchUser,callback)=>{
    try{

        db.query(`select * from user where email="${searchUser}"`,(err,userInfo)=>{
            if(err){
                callback({status:500,msg:"Internal Server Error"});
            }
            else{
                if(userInfo.length===0)
                {
                    callback({status:404,msg:"user not found"});
                }
                else if(userInfo.length>0){
                    db.query(`select * from invitations where sendBy="${email}" and sendTo="${searchUser}"`,(err,result)=>{
                        if(err){
                            callback({status:500,msg:"Internal Server Error"});
                        }
                        else{
                            if(result.length===0)
                            {
                                db.query(`select * from invitations where sendBy="${searchUser}" and sendTo="${email}"`,(err,result)=>{
                                    if(err){
                                        callback({status:500,msg:"Internal Server Error"});
                                    }
                                    else{
                                        if(result.length===0){
                                            callback({status:200,data:userInfo[0],type:"new search"});
                                        }
                                        else if(result.length>0){
                                            callback({status:200,data:userInfo[0],type:"arived request"});
                                        }
                                    }
                                });
                            }
                            else if(result.length>0){
                                callback({status:200,data:userInfo[0],type:"request already sended"});
                            }
                        }
                    })
            }
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