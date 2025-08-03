# Email API Documentation

A REST API for sending emails using nodemailer with SMTP support.

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, no authentication is required. In production, consider implementing API keys or other authentication methods.

## Endpoints

### Health Check
Check if the API is running.

**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Email API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Verify SMTP Connection
Test the SMTP connection configuration.

**GET** `/api/verify-connection`

**Response:**
```json
{
  "success": true,
  "connected": true,
  "message": "SMTP connection verified"
}
```

### Send Text Email
Send a plain text email.

**POST** `/api/send-text-email`

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a plain text email.",
  "from": "sender@example.com" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Text email sent successfully",
  "messageId": "<message-id@smtp.server>",
  "response": "250 2.0.0 OK"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/send-text-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a plain text email."
  }'
```

### Send HTML Email
Send an HTML email with optional plain text fallback.

**POST** `/api/send-html-email`

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "HTML Email Test",
  "html": "<h1>Hello!</h1><p>This is an <strong>HTML email</strong>.</p>",
  "text": "Hello! This is an HTML email.", // optional fallback
  "from": "sender@example.com" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "HTML email sent successfully",
  "messageId": "<message-id@smtp.server>",
  "response": "250 2.0.0 OK"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/send-html-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "HTML Email Test",
    "html": "<h1>Hello!</h1><p>This is an <strong>HTML email</strong>.</p>"
  }'
```

### Send Email with Attachments
Send an email with file attachments.

**POST** `/api/send-email-with-attachments`

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email with Attachments",
  "text": "Please find the attached files.",
  "html": "<p>Please find the <strong>attached files</strong>.</p>", // optional
  "from": "sender@example.com", // optional
  "attachments": [
    {
      "filename": "document.txt",
      "content": "This is the content of the file",
      "contentType": "text/plain"
    },
    {
      "filename": "data.json",
      "content": "{\"message\": \"Hello from attachment!\"}",
      "contentType": "application/json"
    }
  ]
}
```

**Attachment Object Properties:**
- `filename` (string, required): Name of the attachment
- `content` (string, required): File content as string or base64
- `contentType` (string, optional): MIME type of the file
- `path` (string, optional): File path (alternative to content)
- `encoding` (string, optional): Content encoding (e.g., 'base64')

**Response:**
```json
{
  "success": true,
  "message": "Email with attachments sent successfully",
  "messageId": "<message-id@smtp.server>",
  "response": "250 2.0.0 OK"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/send-email-with-attachments \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Email with Attachments",
    "text": "Please find the attached files.",
    "attachments": [
      {
        "filename": "hello.txt",
        "content": "Hello World!",
        "contentType": "text/plain"
      }
    ]
  }'
```

### Send Bulk Email
Send an email to multiple recipients.

**POST** `/api/send-bulk-email`

**Request Body:**
```json
{
  "to": [
    "recipient1@example.com",
    "recipient2@example.com",
    "recipient3@example.com"
  ],
  "subject": "Bulk Email Test",
  "text": "This email was sent to multiple recipients.",
  "html": "<p>This email was sent to <strong>multiple recipients</strong>.</p>", // optional
  "from": "sender@example.com" // optional
}
```

**Alternative format (comma-separated string):**
```json
{
  "to": "recipient1@example.com,recipient2@example.com,recipient3@example.com",
  "subject": "Bulk Email Test",
  "text": "This email was sent to multiple recipients."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bulk email sent successfully",
  "messageId": "<message-id@smtp.server>",
  "response": "250 2.0.0 OK"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/send-bulk-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["user1@example.com", "user2@example.com"],
    "subject": "Bulk Email Test",
    "text": "This email was sent to multiple recipients."
  }'
```

### API Documentation
Get API documentation in JSON format.

**GET** `/api/docs`

**Response:**
```json
{
  "title": "Email API Documentation",
  "version": "1.0.0",
  "baseUrl": "http://localhost:3000",
  "endpoints": {
    // ... endpoint definitions
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `404` - Endpoint not found
- `500` - Internal Server Error (SMTP or server issues)

## Example Error Responses

**Missing Required Fields (400):**
```json
{
  "success": false,
  "error": "Missing required fields",
  "message": "to, subject, and text are required"
}
```

**SMTP Connection Error (500):**
```json
{
  "success": false,
  "error": "Failed to send text email",
  "message": "Invalid login: 535-5.7.8 Username and Password not accepted"
}
```

## JavaScript Examples

### Using Fetch API
```javascript
// Send text email
const response = await fetch('http://localhost:3000/api/send-text-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'This is a test email from the API.'
  })
});

const result = await response.json();
console.log(result);
```

### Using Axios
```javascript
const axios = require('axios');

try {
  const response = await axios.post('http://localhost:3000/api/send-html-email', {
    to: 'recipient@example.com',
    subject: 'HTML Email',
    html: '<h1>Hello!</h1><p>This is an HTML email.</p>'
  });
  
  console.log('Email sent:', response.data);
} catch (error) {
  console.error('Error:', error.response.data);
}
```

## Rate Limiting
Currently, no rate limiting is implemented. Consider adding rate limiting in production environments.

## Security Considerations
- Implement authentication (API keys, JWT tokens)
- Add rate limiting to prevent abuse
- Validate and sanitize all input data
- Use HTTPS in production
- Consider implementing email templates to prevent HTML injection
- Log all email sending activities for audit purposes

## Environment Variables
Consider using environment variables for configuration:
- `PORT` - Server port (default: 3000)
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password