import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';


const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3006';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

// Create Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Validate environment variables on startup
if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.error('ERROR: Missing required environment variables (GMAIL_USER or GMAIL_APP_PASSWORD)');
  process.exit(1);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend service is running' });
});

// Contact form email endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { from_name, from_email, phone, company, service, project_details } = req.body;

    // Validate required fields
    if (!from_name || !from_email || !phone || !service || !project_details) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Build email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Inquiry – DeccaNoid IT Solutions</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 180px;">Full Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${from_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${from_email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone Number</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Selected Service</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
          </tr>
        </table>
        
        <h3 style="color: #2563eb; margin-top: 20px; margin-bottom: 10px;">Project Details</h3>
        <div style="white-space: pre-wrap; background-color: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
          ${project_details}
        </div>
        
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          <strong>Submitted On:</strong> ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'deccanoid@gmail.com',
      replyTo: from_email,
      subject: `New Contact Inquiry – DeccaNoid IT Solutions`,
      html: emailContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.GMAIL_USER}`);
  console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`);
});
