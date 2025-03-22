import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter with the correct configurations
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'brevo',
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD
  },
  debug: process.env.NODE_ENV === 'development'
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transport verification failed:', error);
  } else {
    console.log('Email transport ready for messages');
  }
});

export default transporter;