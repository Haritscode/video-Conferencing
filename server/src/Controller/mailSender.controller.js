require("dotenv").config();
const transporter = require("../../config/nodemailer/nodemailer.config");
const verificationCode = require("../Functionality_Function/MailContent");
const generateOtp = require("../Functionality_Function/OtpGenetration");
const dbconnect = require("../../config/db/config");
const ErrorHandler = require("../../config/errorHandler/customErrorHandler");
const ExistedUserVerification = async (req, res, next) => {
  const otp = generateOtp(6);
  try {
    dbconnect.query(
      `SELECT * FROM otp where email="${req.userDetails.email}"`,
      async (err, result) => {
        if (err) {
          next(new ErrorHandler())
          } else {
          if (result[0]) {
            res.status(208).json({ msg: "code already send" });
          } else {
            const info = await transporter.sendMail({
              to: `${req.userDetails.email}`,
              subject: "new Testing email",
              html: verificationCode(
                "VERIFICATIONCODE",
                req?.userDetails?.name,
                otp
              ),
            });
            if (info.messageId.length > 0) {
              dbconnect.query(
                `INSERT INTO otp (email,otp) VALUES ('${req.userDetails.email}',${otp})`,
                (err, result) => {
                  if (err) {
                    next(new ErrorHandler());
                  } else if (result) {
                    res.status(201).json({ msg: "otp send successfully" });
                  }
                }
              );
            }
          }
        }
      }
    );
  } catch (err) {
    next(new ErrorHandler())
  }
};
const newUserVerification = (req, res) => {
  const { email, name } = req.body;
  const otp = generateOtp(6);
  try {
    dbconnect.query(
      `SELECT * FROM user where email="${email}"`,
      (err, result) => {
        if (err) {
          console.log("err1 --->", err)
          next(new ErrorHandler())
        } else {
          if (result.length>0) {
            res.status(208).json({ msg: "user already exist" });
          } else {
            dbconnect.query(
              `SELECT * FROM otp where email="${email}"`,
              async (err, result) => {
                if (err) {
                  console.log("err2--->", err)
                  next(new ErrorHandler())
                } else {
                  if (result[0]) {
                    res.status(208).json({ msg: "code already send"});
                  } else {
                    const info = await transporter.sendMail({
                      to: `${email}`,
                      subject: "New User",
                      html: verificationCode("VERIFICATIONCODE", name, otp),
                    });
                    if (info.messageId.length > 0) {
                      dbconnect.query(
                        `INSERT INTO otp (email,otp) VALUES ('${email}',${otp})`,
                        (err, result) => {
                          if (err) {
                            next(new ErrorHandler())
                          } else if (result) {
                            res
                              .status(201)
                              .json({ msg: "otp send successfully" });
                          }
                        }
                      );
                    }
                  }
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log("err3--->", err);
    next(new ErrorHandler())
  }
};
module.exports = { ExistedUserVerification, newUserVerification };
