const nodemailer = require('nodemailer');

// Getting env
// const path = require('path');
// require('dotenv').config({
//   path: path.join(__dirname, '../config/.env'),
// });

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'confirmation@meta.ua',
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendConfirmMail = async (configObj) => {
  const mail = { ...configObj, from: 'confirmation@meta.ua' };

  try {
    await transporter.sendMail(mail);
    console.log('Confirm mail sended success');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendConfirmMail,
};
