const db=require("../../config/db/config");
const searchUser=(email,searchUser,callback)=>{
    db.query(`select receiverId,senderId from connections where ((senderId="${email}" and receiverId like "${searchUser}%") or (senderId like "${searchUser}%" and receiverId="${email}")) and status="accepted"`,(err,connectedUser)=>{
        if(err){
            console.log(err);
        }
        else if(connectedUser.length>0){
            let chats=[];
            connectedUser.map(({receiverId,senderId},count)=>{
                db.query(`select name,email,profileUrl from user where email="${receiverId===email?senderId:receiverId}"`,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else if(result.length>0){
                        chats.push(result[0]);
                        if(count===connectedUser.length-1)
                        {
                            console.log(chats);
                            callback({status:200,data:chats})
                        }
                    }
                })
            })
        }
    }
    )
}
module.exports=searchUser;