const route=require("express").Router();
const chatList = require("../Controller/chatsList.controller");
const chatData=require("../Controller/chatData.controller");
const findChat=require("../Controller/findChats.controller");
const friendStatus=require("../Controller/friendStatus.controller");
const findUser = require("../Controller/findUser.controller");
route.post("/findChat",findChat);
route.get("/findUser",findUser)
route.get("/chatsList",chatList);
route.get("/chatdata",chatData);
route.get("/status",friendStatus)
module.exports=route;