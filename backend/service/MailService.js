"use strict";
require("dotenv").config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
     // port:587,
     port: process.env.EMAIL_PORT,
     secure: process.env.EMAIL_SECURE,
     auth:{
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS,
     }
})

async function sendEmail(to, subject, html) {
  const mailOptions = {
    from:process.env.EMAIL_USER,
    to,
    subject,
    html
  };
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;



// exports.mailService = function(host, port, secure=true,auth){

//      return nodemailer.createTransport({
//      host: host || "smtp.gmail.com",
//      // port:587,
//      port: port || 465,
//      secure: secure,
//      auth: auth || {
//        user: "moh.abbasi70@gmail.com",
//        pass: "uvezqfhdarbrhcew",
//      },
//    });
// }
