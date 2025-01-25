const nodemailer = require('nodemailer');
require('dotenv').config();

// Log email configuration (without showing actual credentials)
console.log('Email Config:', {
  user: process.env.EMAIL_USER ? 'Set' : 'Not Set',
  pass: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Not Set'
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  debug: true // Enable debug logs
});

const sendEmail = async (to, subject, text) => {
  // Verify credentials exist
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Email credentials not configured');
  }

  try {
    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    const info = await transporter.sendMail({
      from: `"Gaming Website" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email error:', {
      code: error.code,
      message: error.message
    });
    throw error;
  }
};

module.exports = sendEmail;