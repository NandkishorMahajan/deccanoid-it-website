# DeccaNoid Backend Email Service

This backend handles email sending for the DeccaNoid IT Solutions contact form using Node.js, Express, and Nodemailer.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Gmail SMTP Authentication

You need to use a Gmail App Password (not your regular Gmail password) for security.

**Steps to generate Gmail App Password:**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords** section
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character app password
6. Copy this password

### 3. Update `.env.local`

Edit `backend/.env.local` and fill in:

```env
PORT=5000
GMAIL_USER=deccanoid@gmail.com
GMAIL_APP_PASSWORD=paste_your_16_char_app_password_here
FRONTEND_URL=http://localhost:3006
```

**Important:** Replace `paste_your_16_char_app_password_here` with the actual app password from Google.

### 4. Run the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000` and confirm:
- ✅ Backend server running
- 📧 Email service configured
- 🌐 CORS enabled for frontend

### 5. Verify Backend is Working

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{"status": "Backend service is running"}
```

## API Endpoint

### POST /api/contact

**Request Body:**
```json
{
  "from_name": "John Doe",
  "from_email": "john@example.com",
  "phone": "+91 9584777747",
  "company": "Company Name",
  "service": "Cloud Solutions",
  "project_details": "Project description here..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "..."
}
```

## Troubleshooting

### "Failed to load resource: 400" Error
- Check that `.env.local` has correct credentials
- Verify Gmail account has 2-Step Verification enabled
- Ensure you're using an App Password, not regular Gmail password
- Check CORS configuration matches frontend URL

### "ECONNREFUSED" in Frontend Console
- Backend server is not running
- Run `npm run dev` in the `backend` folder
- Verify it's running on port 5000

### Email Not Arriving
- Check spam/promotions folder
- Verify `deccanoid@gmail.com` in server.js matches your email
- Check Gmail account security settings allow less secure apps

## File Structure

```
backend/
├── server.js          # Main Express server
├── package.json       # Dependencies
├── .env.local         # Local configuration (keep secret)
├── .env.example       # Example configuration
└── README.md          # This file
```

## Important Notes

- Never commit `.env.local` to git (it's in .gitignore)
- Frontend and backend must run on different ports (3006 and 5000)
- CORS is configured to allow requests from frontend only
- All form data is validated on the backend
