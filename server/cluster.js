const cluster= require("cluster")
const os=require("os");
const numberOfCpus=os.cpus().length;
const server=require('./app')
const express=require("express");
const app=express();
if(cluster.isPrimary)
{
    console.log(`primary server processid: ${process.pid}`);
    for(let i=0;i<numberOfCpus;i++)
    {
        cluster.fork();
    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`);
    })
}else{
    app.use(server);
}
// cluster.
