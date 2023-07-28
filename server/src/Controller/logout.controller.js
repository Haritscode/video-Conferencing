const logout=(req,res)=>{
    res.cookie("atoken","",{maxAge:0});
    res.cookie("rtoken","",{maxAge:0});
    res.status(200).send({msg:"User Logged Out"});
}
module.exports=logout;