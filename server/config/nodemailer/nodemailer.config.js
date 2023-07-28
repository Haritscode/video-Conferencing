require("dotenv").config();
const nodemailer=require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure:true,
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_MAIL_EMAIL,
    pass: process.env.GOOGLE_MAIL_PASSWORD,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  }
  });
module.exports=transporter;