const sendGridMail = require('@sendgrid/mail');

// Getting env
// const path = require('path');
// require('dotenv').config({
//   path: path.join(__dirname, '../config/.env'),
// });

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailSendGrid = async (configObj) => {
  const msg = { ...configObj, from: 'mr.a.sidorenko@gmail.com' };

  try {
    await sendGridMail.send(msg);
    console.log(`Mail sended success to ${msg.to}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMailSendGrid,
};
