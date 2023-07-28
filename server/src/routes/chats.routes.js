const route=require("express").Router();
const findUser=require("../Controller/findUser.controller");
route.post("/findUser",findUser);
module.exports=route;