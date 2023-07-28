const { Server } = require("socket.io");
const verifyHandshake = require("../../src/Functionality_Function/verifyHandshake");
const findUser = require("../../src/eventEmmiters/findUser.emmiter");
const redis=require("../redis/redis.config");
const charRequests=require("../../src/eventEmmiters/chatRequests.emmiter");
const userConnected = require("../../src/eventEmmiters/userConnected.emmiter");
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
    },
  });
  io.use((socket, next) => {
    
    try{ 
      const cookies = socket.handshake.headers.cookie;
      let rtoken = cookies.split(";")[0];
      rtoken = rtoken.split("Bearer%20")[1];
      let atoken = cookies.split(";")[1];
      atoken = atoken.split("Bearer%20")[1];
      verifyHandshake(atoken, rtoken, next);
    }
    catch(err){
      socket.emit("auth_Error",err)
    }
  });
  io.on("connection", (socket) => {
    socket.on("userConnected",(email,callback)=>{
      const socketId=socket.id;
      console.log({socketId1:socketId,email});
      redis.set(email,socketId)
      userConnected(email,callback);
    })
    socket.on("findUser",(email,searchUser,callback)=>{
      findUser(email,searchUser,callback);
    });
    socket.on("sendRequest",async(sendBy,sendTo,callback)=>{
      charRequests(sendBy,sendTo,callback,socket);
    });
    socket.on("disconnect",()=>{
      removeUserFromRedis(socket.id);
    })
  });
};
module.exports = socketio;
