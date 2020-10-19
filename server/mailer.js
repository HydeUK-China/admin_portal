const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// const cors = require('cors');

const transporter = nodemailer.createTransport({
    host: "smtpw.263.net", //replace with your email provider
    port: 465,
    auth: {
      user: "contact@hyde-china.com", //replace with the email address
      pass: "Cmm2020cm107" //replace with the password
    }
  });

function mailSend (req, res){
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    const mail_body = "<b>First Name: </b>" + fname + "<br/>" +
                      "<b>Last Name: </b>" + lname + "<br/>" +
                      "<b>Email: </b>" + email + "<br/>" +
                      "<b>Message: </b>" +
                      "<p>" + message + "</p>" 
    // var content = `Fname: ${fname} \n Lname: ${lname} \n email: ${email} \n subject: ${subject} \n message: ${message} `
    const mail = {
      from: 'contact@hyde-china.com',
      to: 'contact@hyde-china.com',
      subject: subject,
      html: mail_body
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.status(400).json({
          success: false,
          msg: "Something went wrong!"
      });
      } else {
        res.status(200).json({
          success: true,
          data: "Success!"
      })
      }
    })
}

module.exports = {
    mailSend
}