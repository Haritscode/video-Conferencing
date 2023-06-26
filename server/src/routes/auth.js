const express = require("express");
const routes = express.Router();
const isUserExists = require("../middlewares/isUserExists");
const { Token } = require("../middlewares/tokens");
const createUser = require("../middlewares/createUser");
const passport = require("passport");
const oAuth = require("../middlewares/oauth");
routes.post("/login", isUserExists, Token);
routes.post("/signup", createUser);
routes.get("/login/success",(req,res)=>{
  if(req.user){
    res.status(200).json({
      error:false,
      message:"Successfully Logged In",
      user:req.user,
    })
  }
  else{
    res.status(403).json({error:true,message:'Not Authorizes'})
  } 
});
routes.get("/login/failed",(req,res)=>{
  res.status(401).json({error:true,message:'Log In failure'})
})
routes.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed"}),oAuth,Token);
module.exports = routes;
