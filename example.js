const EmailService = require("./emailService");

// Initialize the email service
const emailService = new EmailService();

async function runExamples() {
  try {
    // First, verify the SMTP connection
    console.log("Verifying SMTP connection...");
    const isConnected = await emailService.verifyConnection();

    if (!isConnected) {
      console.log("SMTP connection failed. Please check your configuration.");
      return;
    }

    console.log("\n--- Email Service Examples ---\n");

    // // Example 1: Send a simple text email
    // console.log("1. Sending simple text email...");
    // await emailService.sendTextEmail(
    //   "morongwamosopi@gmail.com",
    //   "Test Email - Plain Text",
    //   "This is a test email sent using the Node.js email service with plain text content."
    // );

    // Example 2: Send an HTML email
    console.log("2. Sending HTML email...");
    const htmlContent = `
      <h1>Welcome to Our Service!</h1>
      <p>This is an <strong>HTML email</strong> sent using our Node.js email service.</p>
      <ul>
        <li>Feature 1: Easy to use</li>
        <li>Feature 2: Reliable delivery</li>
        <li>Feature 3: HTML support</li>
      </ul>
      <p>Best regards,<br>Your Email Service Team</p>
    `;

    await emailService.sendHtmlEmail(
      "morongwamosopi@gmail.com",
      "Test Email - HTML Content",
      htmlContent,
      "This is the plain text fallback for the HTML email."
    );

    // Example 3: Send email with attachments
    // console.log("3. Sending email with attachments...");
    // const attachments = [
    //   {
    //     filename: "sample.txt",
    //     content: "This is a sample text file attachment.",
    //     contentType: "text/plain",
    //   },
    //   {
    //     filename: "data.json",
    //     content: JSON.stringify({
    //       message: "Hello from attachment!",
    //       timestamp: new Date(),
    //     }),
    //     contentType: "application/json",
    //   },
    // ];

    // await emailService.sendEmailWithAttachments(
    //   "recipient@example.com",
    //   "Test Email - With Attachments",
    //   "This email contains sample attachments.",
    //   attachments,
    //   "<p>This email contains <strong>sample attachments</strong>.</p>"
    // );

    // Example 4: Send bulk email to multiple recipients
    // console.log("4. Sending bulk email...");
    // const recipients = [
    //   "recipient1@example.com",
    //   "recipient2@example.com",
    //   "recipient3@example.com",
    // ];

    // await emailService.sendBulkEmail(
    //   recipients,
    //   "Bulk Email Test",
    //   "This is a bulk email sent to multiple recipients.",
    //   "<p>This is a <strong>bulk email</strong> sent to multiple recipients.</p>"
    // );

    console.log("\nAll email examples completed successfully!");
  } catch (error) {
    console.error("Error running email examples:", error.message);
  }
}

// Uncomment the line below to run the examples
// runExamples();

console.log("Email service examples loaded. To run examples:");
console.log("1. Update the SMTP configuration in config.js");
console.log("2. Replace recipient email addresses in this file");
console.log("3. Uncomment the runExamples() call at the bottom");
console.log("4. Run: node example.js");
