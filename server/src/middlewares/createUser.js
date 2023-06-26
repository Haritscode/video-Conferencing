const { default: ShortUniqueId } = require("short-unique-id");
const dbconnect = require("../../config/config");
const uid = new ShortUniqueId({ length: 8 });
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const id = uid();
  dbconnect.query(
    `INSERT INTO user (name,email,password,uid) VALUES ('${name}','${email}','${password}','${id}')`,
    (err, result) => {
      if (err) {
        res.status(409).json({errMsg:err.sqlMessage})
      } 
      else {
        if(result.affectedRows==1)
        {
          res.status(201).json({msg:"success"})
        }
        else{
            res.status(404).json({errMsg:"some server error"});
        }
      }
    }
  );
};
module.exports = createUser;
