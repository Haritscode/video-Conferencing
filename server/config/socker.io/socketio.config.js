const { Server } = require("socket.io");
const verifyHandshake = require("../../src/Functionality_Function/verifyHandshake");
const redis=require("../redis/redis.config");
const Requests=require("../../src/eventEmiters/chatRequests.emiter");
const userConnected = require("../../src/eventEmiters/userConnected.emiter");
const acceptRequest = require("../../src/eventEmiters/acceptRequests.emiter");
const userSearch=require("../../src/eventEmiters/searchUser.emiter");
const messageSent=require("../../src/eventEmiters/messagesender.emiter");
const connectionStatus=require("../../src/eventEmiters/connectionStatus.emiter")
redis.connect();

const removeUserFromRedis=async(id)=>{
  let data=await redis.keys("*"); 
  data.map(async (value)=>{
    let uid=await redis.get(value);
    if(id===uid){
      let result=await redis.del(value);
      if(result){
        return;
      }
    }
  })    
}

const socketio = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    }
  });
  io.use((socket, next) => {
    try{ 
      const cookies = socket.handshake.headers.cookie;
      let rtoken = cookies.split("rtoken=")[1].split("Bearer%20")[1].split(";")[0];
      let atoken = cookies.split("atoken=")[1].split("Bearer%20")[1].split(";")[0];
      verifyHandshake(atoken, rtoken,socket, next);
    }
    catch(err){
      socket.emit("auth_Error",err)
    }
  });
  io.on("connection", (socket) => {
    connectionStatus(socket)
    socket.on("userConnected",(email,callback)=>{
      const socketId=socket.id;
      redis.set(email,socketId)
      userConnected(email,callback);
    })
    socket.on("sendRequest",(sendBy,sendTo,callback)=>{
      console.log(sendBy,sendTo);
      Requests(sendBy,sendTo,callback,socket);
    });
    socket.on("acceptRequest",(acceptedBy,acceptedFor,status,callback)=>{
      acceptRequest(acceptedBy,acceptedFor,status,callback,socket);
    })
    socket.on("findchat",(email,searchChat,callback)=>{
      userSearch(email,searchChat,callback);
    })
    socket.on("newMessage",(sendBy,sendTo,message,callback)=>{
      messageSent(sendBy,sendTo,message,callback,socket);
    })
    socket.on("disconnect",()=>{
      removeUserFromRedis(socket.id);
    })
  });
};
module.exports = socketio;
