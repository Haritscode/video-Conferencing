const errorMiddleware=(err,req,res)=>{
    err.Message=err.Message || 'Internal Server Error';
    err.status=err.status || 500;
    res.status(err.status).json({
        success:false,
        message:err.message
    })
}
module.exports=errorMiddleware;