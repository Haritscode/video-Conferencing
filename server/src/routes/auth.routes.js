const express = require("express");
const routes = express.Router();
const isUserExists = require("../middlewares/isUserExists.middleware");
const { Token, verifyToken } = require("../middlewares/tokens.middleware");
const createUser = require("../Controller/createUser.controller");
const oAuth = require("../middlewares/oauth.middleware");
const passport = require("passport");
const {ExistedUserVerification,newUserVerification}=require("../Controller/mailSender.controller");
const verifyOtp=require("../middlewares/verifyOtp.middleware");
const userInfo=require("../Controller/userInfo.controller");
const {googleLoginSuccess,googleLoginFail}=require("../Controller/Google.controller");
const logout = require("../Controller/logout.controller");


routes.post("/login", isUserExists,ExistedUserVerification);
routes.post("/signup", newUserVerification);
routes.post("/verifyuser",verifyOtp,createUser,Token);
routes.get("/check-logged-in",verifyToken,userInfo);
routes.get("/logout",logout)
routes.get("/login/success",googleLoginSuccess);
routes.get("/login/failed",googleLoginFail)
routes.get("/google/callback",passport.authenticate("google", {failureRedirect: "/login/failed"}),oAuth,Token,(req,res)=>{
  res.redirect("http://192.168.154.27:3000") 
});


module.exports = routes;
