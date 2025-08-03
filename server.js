const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const EmailService = require("./emailService");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize email service
const emailService = new EmailService();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Email API is running",
    timestamp: new Date().toISOString(),
  });
});

// SMTP connection verification endpoint
app.get("/api/verify-connection", async (req, res) => {
  try {
    const isConnected = await emailService.verifyConnection();
    res.json({
      success: true,
      connected: isConnected,
      message: isConnected
        ? "SMTP connection verified"
        : "SMTP connection failed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Connection verification failed",
      message: error.message,
    });
  }
});

// Send text email endpoint
// app.post("/api/send-text-email", async (req, res) => {
//   try {
//     const { to, subject, text, from } = req.body;

//     // Validation
//     if (!to || !subject || !text) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields",
//         message: "to, subject, and text are required",
//       });
//     }

//     const result = await emailService.sendTextEmail(to, subject, text, from);

//     res.json({
//       success: true,
//       message: "Text email sent successfully",
//       messageId: result.messageId,
//       response: result.response,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to send text email",
//       message: error.message,
//     });
//   }
// });

// Send HTML email endpoint
app.post("/api/send-html-email", async (req, res) => {
  try {
    const { to, subject, html, text, from } = req.body;

    // Validation
    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "to, subject, and html are required",
      });
    }

    const result = await emailService.sendHtmlEmail(
      to,
      subject,
      html,
      text,
      from
    );

    res.json({
      success: true,
      message: "HTML email sent successfully",
      messageId: result.messageId,
      response: result.response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to send HTML email",
      message: error.message,
    });
  }
});

// Send email with attachments endpoint
// app.post("/api/send-email-with-attachments", async (req, res) => {
//   try {
//     const { to, subject, text, attachments, html, from } = req.body;

//     // Validation
//     if (!to || !subject || !text || !attachments) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields",
//         message: "to, subject, text, and attachments are required",
//       });
//     }

//     if (!Array.isArray(attachments)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid attachments format",
//         message: "attachments must be an array",
//       });
//     }

//     const result = await emailService.sendEmailWithAttachments(
//       to,
//       subject,
//       text,
//       attachments,
//       html,
//       from
//     );

//     res.json({
//       success: true,
//       message: "Email with attachments sent successfully",
//       messageId: result.messageId,
//       response: result.response,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to send email with attachments",
//       message: error.message,
//     });
//   }
// });

// Send bulk email endpoint
// app.post("/api/send-bulk-email", async (req, res) => {
//   try {
//     const { to, subject, text, html, from } = req.body;

//     // Validation
//     if (!to || !subject || !text) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields",
//         message: "to, subject, and text are required",
//       });
//     }

//     if (!Array.isArray(to) && typeof to !== "string") {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid recipients format",
//         message: "to must be an array of emails or comma-separated string",
//       });
//     }

//     const result = await emailService.sendBulkEmail(
//       to,
//       subject,
//       text,
//       html,
//       from
//     );

//     res.json({
//       success: true,
//       message: "Bulk email sent successfully",
//       messageId: result.messageId,
//       response: result.response,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to send bulk email",
//       message: error.message,
//     });
//   }
// });

// API documentation endpoint
// app.get("/api/docs", (req, res) => {
//   const docs = {
//     title: "Email API Documentation",
//     version: "1.0.0",
//     baseUrl: `http://localhost:${PORT}`,
//     endpoints: {
//       health: {
//         method: "GET",
//         path: "/health",
//         description: "Check API health status",
//       },
//       verifyConnection: {
//         method: "GET",
//         path: "/api/verify-connection",
//         description: "Verify SMTP connection",
//       },
//       sendTextEmail: {
//         method: "POST",
//         path: "/api/send-text-email",
//         description: "Send a plain text email",
//         body: {
//           to: "string (required) - Recipient email",
//           subject: "string (required) - Email subject",
//           text: "string (required) - Plain text content",
//           from: "string (optional) - Sender email",
//         },
//       },
//       sendHtmlEmail: {
//         method: "POST",
//         path: "/api/send-html-email",
//         description: "Send an HTML email",
//         body: {
//           to: "string (required) - Recipient email",
//           subject: "string (required) - Email subject",
//           html: "string (required) - HTML content",
//           text: "string (optional) - Plain text fallback",
//           from: "string (optional) - Sender email",
//         },
//       },
//       sendEmailWithAttachments: {
//         method: "POST",
//         path: "/api/send-email-with-attachments",
//         description: "Send email with attachments",
//         body: {
//           to: "string (required) - Recipient email",
//           subject: "string (required) - Email subject",
//           text: "string (required) - Plain text content",
//           attachments: "array (required) - Array of attachment objects",
//           html: "string (optional) - HTML content",
//           from: "string (optional) - Sender email",
//         },
//       },
//       sendBulkEmail: {
//         method: "POST",
//         path: "/api/send-bulk-email",
//         description: "Send email to multiple recipients",
//         body: {
//           to: "array|string (required) - Array of emails or comma-separated string",
//           subject: "string (required) - Email subject",
//           text: "string (required) - Plain text content",
//           html: "string (optional) - HTML content",
//           from: "string (optional) - Sender email",
//         },
//       },
//     },
//   };

//   res.json(docs);
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    message: `${req.method} ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email API server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  // console.log(`API documentation: http://localhost:${PORT}/api/docs`);
  console.log(
    `Verify SMTP connection: http://localhost:${PORT}/api/verify-connection`
  );
});

module.exports = app;
