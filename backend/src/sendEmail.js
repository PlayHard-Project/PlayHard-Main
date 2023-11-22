const nodemailer = require('nodemailer');
const fs = require('fs').promises;

async function sendMail(to, subject, html) {
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

    let htmlcontent;

    htmlcontent = await loadHtmlFile(html);

    const mailOptions = {
      from: myEmail,
      to: to,
      subject: subject,
      html: htmlcontent,
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

async function loadHtmlFile(filePath) {
  try {
    const htmlContent = await fs.readFile(filePath, 'utf-8');
    return htmlContent;
  } catch (error) {
    console.error('Error loading HTML file:', error);
    throw error;
  }
}

module.exports = sendMail;
