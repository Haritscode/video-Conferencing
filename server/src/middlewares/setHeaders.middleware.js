const setHeaders=(req,res,next)=>{
    res.header('Access-Control-Allow-Origin',req.headers.origin);
    res.header( 'Access-Control-Allow-Credentials',true);
    next();
}
module.exports=setHeaders;