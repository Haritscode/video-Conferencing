const {createClient}=require("redis");

const client=createClient({
    url:"redis://redis:6379"
})
client.on("connect",()=>{
    console.log("redis started Successfully");
})
client.on("error",(err)=>{
    console.log("redis error: ",err);
})
module.exports=client;