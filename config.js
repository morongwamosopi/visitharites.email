/**
 * SMTP Configuration
 * Update these settings with your SMTP server details
 */

const config = {
  smtp: {
    host: "mail.visitharties.co.za", // Your SMTP server hostname
    port: 465, // SMTP port (587 for TLS, 465 for SSL, 25 for non-secure)
    secure: true, // true for 465, false for other ports
    auth: {
      user: "noreply@visitharties.co.za", // Your email address
      pass: "yaU@d7FS8upEU2K", // Your email password or app password
    },
  },

  // Default email settings
  defaults: {
    from: "noreply@visitharties.co.za", // Default sender email
    replyTo: "visitharties@gmail.com", // Default reply-to email
  },
};

module.exports = config;
