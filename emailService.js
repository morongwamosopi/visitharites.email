const nodemailer = require("nodemailer");
const config = require("./config");

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * Initialize the nodemailer transporter with SMTP configuration
   */
  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport(config.smtp);
      console.log("Email transporter initialized successfully");
    } catch (error) {
      console.error("Failed to initialize email transporter:", error.message);
      throw error;
    }
  }

  /**
   * Verify SMTP connection
   * @returns {Promise<boolean>} - Returns true if connection is successful
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log("SMTP connection verified successfully");
      return true;
    } catch (error) {
      console.error("SMTP connection verification failed:", error.message);
      return false;
    }
  }

  /**
   * Send a simple text email
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} text - Plain text content
   * @param {string} from - Sender email (optional, uses default from config)
   * @returns {Promise<Object>} - Nodemailer result object
   */
  async sendTextEmail(to, subject, text, from = null) {
    const mailOptions = {
      from: from || config.defaults.from,
      to: to,
      subject: subject,
      text: text,
      replyTo: config.defaults.replyTo,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log("Text email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send text email:", error.message);
      throw error;
    }
  }

  /**
   * Send an HTML email
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} html - HTML content
   * @param {string} text - Plain text fallback (optional)
   * @param {string} from - Sender email (optional, uses default from config)
   * @returns {Promise<Object>} - Nodemailer result object
   */
  async sendHtmlEmail(to, subject, html, text = null, from = null) {
    const mailOptions = {
      from: from || config.defaults.from,
      to: config.defaults.replyTo,
      subject: subject,
      html: html,
      text: text,
      replyTo: to,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log("HTML email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send HTML email:", error.message);
      throw error;
    }
  }

  /**
   * Send email with attachments
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} text - Plain text content
   * @param {Array} attachments - Array of attachment objects
   * @param {string} html - HTML content (optional)
   * @param {string} from - Sender email (optional, uses default from config)
   * @returns {Promise<Object>} - Nodemailer result object
   */
  async sendEmailWithAttachments(
    to,
    subject,
    text,
    attachments,
    html = null,
    from = null
  ) {
    const mailOptions = {
      from: from || config.defaults.from,
      to: to,
      subject: subject,
      text: text,
      html: html,
      attachments: attachments,
      replyTo: config.defaults.replyTo,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(
        "Email with attachments sent successfully:",
        result.messageId
      );
      return result;
    } catch (error) {
      console.error("Failed to send email with attachments:", error.message);
      throw error;
    }
  }

  /**
   * Send email to multiple recipients
   * @param {Array|string} to - Array of recipient email addresses or comma-separated string
   * @param {string} subject - Email subject
   * @param {string} text - Plain text content
   * @param {string} html - HTML content (optional)
   * @param {string} from - Sender email (optional, uses default from config)
   * @returns {Promise<Object>} - Nodemailer result object
   */
  async sendBulkEmail(to, subject, text, html = null, from = null) {
    const mailOptions = {
      from: from || config.defaults.from,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject: subject,
      text: text,
      html: html,
      replyTo: config.defaults.replyTo,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log("Bulk email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send bulk email:", error.message);
      throw error;
    }
  }
}

module.exports = EmailService;
