const nodemailer = require('nodemailer');
require('dotenv').config();

// Log email configuration (without showing actual credentials)
console.log('Email Config:', {
  user: process.env.EMAIL_USER ? 'Set' : 'Not Set',
  pass: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not Set'
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email credentials missing');
    throw new Error('Email configuration incomplete');
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', {
      code: error.code,
      message: error.message
    });
    throw error;
  }
};

module.exports = sendEmail; 