const { default: ShortUniqueId } = require("short-unique-id");
const dbconnect = require("../../config/db/config");
const bcypt=require("bcrypt"); 
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const uid = new ShortUniqueId({ length: 8 });
const createUser = async (req, res,next) => {
  const { name, email, password } = req.body;
  dbconnect.query(`SELECT * FROM user WHERE email="${email}"`,(err,result)=>{
    if(err){
      next(new ErrorHandler())
    }
    else{
      if(result[0]){
        bcypt.compare(password,result[0].password)
        .then(resp=>{
          if(resp)  next();
          else next(new ErrorHandler("Unauthorized user",401));
        })
        .catch(err=>{
          next(new ErrorHandler());
        })
      }
      else{
        bcypt.hash(password,10,(err,encryptedPassword)=>{
          if(err){
            next(new ErrorHandler())
          }
          else{
            const id = uid();
            dbconnect.query(`INSERT IGNORE user (uid,name,email,password) VALUES ("${id}","${name}","${email}","${encryptedPassword}")`,(err,result)=>{
              if(err){
                next(new ErrorHandler())
              }
              else{
                if(result.affectedRows===1)  next();
              }
            })
          } 
        })
      }
    }
  })
};
module.exports = createUser;
