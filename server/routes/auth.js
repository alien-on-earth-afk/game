const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const sendEmail = require('../utils/email');

// Store OTPs 
const otpStore = new Map();
const cooldowns = new Map();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,    // xalien909@gmail.com
    pass: process.env.EMAIL_PASS     
  }
});

// Check username availability
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    console.log('Checking username:', username);
    
    const existingUser = await User.findOne({ username });
    console.log('Existing user:', existingUser);
    
    res.json({ available: !existingUser });
  } catch (error) {
    console.error('Username check error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Signup route with improved error handling
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate all required fields
    if (!username || !email || !password) {
      console.log('Missing fields:', { username, email });
      return res.status(400).json({ 
        message: 'All fields are required',
        missing: {
          username: !username,
          email: !email,
          password: !password
        }
      });
    }

    // Log the complete data
    console.log('Complete signup data:', { 
      username, 
      email,
      hasPassword: !!password 
    });

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 
          'Email already registered' : 
          'Username already taken' 
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store data in OTP store
    otpStore.set(email, {
      otp,
      hashedPassword,
      username,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    console.log('OTP generated for:', email);
    console.log('Stored data:', otpStore.get(email));

    // Send verification email
    try {
      await sendEmail(
        email,
        'Email Verification',
        `Your verification code is: ${otp}`
      );
      console.log('Verification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return res.status(500).json({ 
        message: 'Failed to send verification email',
        details: emailError.message
      });
    }

    res.json({ message: 'Verification code sent to email' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Signup failed',
      error: error.message 
    });
  }
});

// Verify signup OTP route
router.post('/verify-signup', async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('Verifying signup:', { email, otp });

    const storedData = otpStore.get(email);
    if (!storedData) {
      console.error('No stored data found for email:', email);
      return res.status(400).json({ message: 'No verification data found' });
    }

    console.log('Found stored data:', {
      hasOTP: !!storedData.otp,
      hasUsername: !!storedData.username,
      expiresAt: new Date(storedData.expiresAt)
    });

    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (!storedData.username) {
      console.error('Username missing from stored data');
      return res.status(400).json({ message: 'Username data missing. Please try signing up again.' });
    }

    // Create new user with stored username
    const user = new User({
      username: storedData.username,
      email: email,
      password: storedData.hashedPassword,
      isEmailVerified: true
    });

    console.log('Attempting to save user:', {
      username: user.username,
      email: user.email
    });

    await user.save();
    otpStore.delete(email);

    res.json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Include username in the response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { 
        email: user.email, 
        username: user.username  // Make sure to include username
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request login OTP
router.post('/request-login-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check cooldown
    const lastRequest = cooldowns.get(email);
    if (lastRequest && Date.now() - lastRequest < 60000) {
      return res.status(429).json({ 
        message: 'Please wait 60 seconds before requesting another OTP',
        remainingTime: Math.ceil((60000 - (Date.now() - lastRequest)) / 1000)
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });
    cooldowns.set(email, Date.now());

    // Send OTP email
    const emailSent = await sendEmail(
      email,
      'Login OTP',
      `Your login OTP is: ${otp}`
    );

    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify login OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedData = otpStore.get(email);

    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP expired' });
    }

    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    otpStore.delete(email);

    res.json({ token, user: { email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test SMTP endpoint
router.get('/test-smtp', (req, res) => {
  try {
    console.log('SMTP test endpoint hit');
    res.json({ message: 'SMTP test endpoint working' });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Username check endpoint
router.post('/check-username', async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Checking username:', username);

    const existingUser = await User.findOne({ username });
    console.log('Username check result:', existingUser ? 'taken' : 'available');

    return res.json({
      available: !existingUser,
      message: existingUser ? 'Username is taken' : 'Username is available'
    });
  } catch (error) {
    console.error('Username check error:', error);
    res.status(500).json({ 
      available: false, 
      message: 'Error checking username' 
    });
  }
});

// Add refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // Extended to 30 days
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '90d' } // 90 days for refresh token
    );

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;