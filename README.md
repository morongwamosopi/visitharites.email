# Node.js Email API Service

A REST API for sending emails using nodemailer with SMTP support. Send emails via HTTP endpoints with support for text, HTML, attachments, and bulk sending.

## Features

- ✅ REST API endpoints for email sending
- ✅ Simple text email sending
- ✅ HTML email support
- ✅ Email attachments
- ✅ Bulk email sending
- ✅ SMTP connection verification
- ✅ Configurable SMTP settings
- ✅ Error handling and logging
- ✅ API documentation endpoint
- ✅ Health check endpoint

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Configure SMTP settings:**
Edit `config.js` with your email provider details:
```javascript
const config = {
  smtp: {
    host: 'your-smtp-server.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@domain.com',
      pass: 'your-password'
    }
  }
};
```

3. **Start the API server:**
```bash
npm start
```

4. **Test the API:**
```bash
curl http://localhost:3000/health
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Core Endpoints
- `GET /health` - Health check
- `GET /api/verify-connection` - Verify SMTP connection
- `GET /api/docs` - API documentation

### Email Endpoints
- `POST /api/send-text-email` - Send plain text email
- `POST /api/send-html-email` - Send HTML email
- `POST /api/send-email-with-attachments` - Send email with attachments
- `POST /api/send-bulk-email` - Send email to multiple recipients

## Quick Examples

### Send Text Email
```bash
curl -X POST http://localhost:3000/api/send-text-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a test email."
  }'
```

### Send HTML Email
```bash
curl -X POST http://localhost:3000/api/send-html-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "HTML Email",
    "html": "<h1>Hello!</h1><p>This is an HTML email.</p>"
  }'
```

### JavaScript Example
```javascript
const response = await fetch('http://localhost:3000/api/send-text-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'API Test',
    text: 'Email sent via API!'
  })
});

const result = await response.json();
console.log(result);
```

## Configuration

### SMTP Settings
Update `config.js` with your email provider settings:

#### Gmail
```javascript
smtp: {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-gmail@gmail.com',
    pass: 'your-app-password'  // Use App Password
  }
}
```

#### Outlook/Hotmail
```javascript
smtp: {
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
  }
}
```

#### Custom SMTP
```javascript
smtp: {
  host: 'mail.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@yourdomain.com',
    pass: 'your-password'
  }
}
```

## Scripts

- `npm start` - Start the API server
- `npm run dev` - Start the API server (development)
- `npm run example` - Run the original email service examples

## API Documentation

For complete API documentation with all endpoints, request/response examples, and error codes, see:
- **Online:** `GET http://localhost:3000/api/docs`
- **File:** [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md)

## Project Structure

```
├── server.js              # Main API server
├── emailService.js        # Email service class
├── config.js             # SMTP configuration
├── example.js            # Usage examples (original)
├── package.json          # Project dependencies
├── README.md             # This file
└── API_DOCUMENTATION.md  # Complete API docs
```

## Email Service Class (Direct Usage)

You can also use the EmailService class directly in your Node.js applications:

```javascript
const EmailService = require('./emailService');

const emailService = new EmailService();

// Send email
await emailService.sendTextEmail(
  'recipient@example.com',
  'Subject',
  'Email content'
);
```

### Available Methods
- `verifyConnection()` - Test SMTP connection
- `sendTextEmail(to, subject, text, from?)` - Send plain text
- `sendHtmlEmail(to, subject, html, text?, from?)` - Send HTML
- `sendEmailWithAttachments(to, subject, text, attachments, html?, from?)` - Send with files
- `sendBulkEmail(to, subject, text, html?, from?)` - Send to multiple recipients

## Error Handling

All API endpoints return consistent JSON responses:

**Success:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "<message-id>"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Security Considerations

- **Authentication:** Consider implementing API keys or JWT tokens for production
- **Rate Limiting:** Add rate limiting to prevent abuse
- **HTTPS:** Use HTTPS in production environments
- **Input Validation:** All inputs are validated, but additional sanitization may be needed
- **Credentials:** Never commit SMTP credentials to version control

## Environment Variables

For production, consider using environment variables:

```bash
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Testing

### Verify SMTP Connection
```bash
curl http://localhost:3000/api/verify-connection
```

### Health Check
```bash
curl http://localhost:3000/health
```

### Send Test Email
```bash
curl -X POST http://localhost:3000/api/send-text-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "API Test",
    "text": "Testing the email API!"
  }'
```

## Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Check username/password in `config.js`
   - For Gmail, use App Passwords instead of regular password
   - Verify SMTP server settings

2. **Connection Timeout**
   - Check SMTP host and port
   - Verify firewall settings
   - Try different ports (587, 465, 25)

3. **SSL/TLS Issues**
   - Set `secure: true` for port 465
   - Set `secure: false` for ports 587/25
   - Check if your SMTP server requires TLS

### Debug Mode
Enable detailed logging by setting the environment variable:
```bash
DEBUG=nodemailer:* npm start
```

## Dependencies

- [express](https://expressjs.com/) - Web framework
- [nodemailer](https://nodemailer.com/) - Email sending library
- [cors](https://github.com/expressjs/cors) - CORS middleware
- [helmet](https://helmetjs.github.io/) - Security middleware
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger

## License

ISC