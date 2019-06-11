/* eslint-disable consistent-return */
const nodeMailer = require('nodemailer');
// const httpStatus = require('http-status');
// const APIError = require('./APIError');

function transporter() {
  try {
    const transporter_ = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'hamidrezanik00nia@gmail.com',
        pass: '12zx3c6635766m',
      },
    });

    return transporter_;
  } catch (error) {
    console.log(error);
  }
}


//   const mailOptions = {
//     from, // sender address
//     to, // list of receivers
//     subject, // Subject line
//     text, // plain text body
//     // html: '<b>Complex</b>', // html body
//   };


module.exports = transporter();
