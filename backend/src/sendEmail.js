const nodemailer = require('nodemailer');

async function sendMail(to, subject) {
  try {
    const myEmail = process.env.MY_EMAIL;
    const myPassword = process.env.MY_PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    });

    const mailOptions = {
      from: myEmail,
      to: to,
      subject: subject,
      html: html,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return reject(new Error('An error has occurred'));
        }
        console.log('Email sent:', info.response);
        return resolve(new Error('Email sent successfully'));
      });
    });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = sendMail;
