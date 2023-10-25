const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1.Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD },
  }); // Activate in gmail 'less secure apps' option (if you're going to use Gmail)

  // 2.Define the email options
  const mailOptions = {
    from: 'Just Name <test3@gmail.com>',
    to: options.email,
    sunject: options.subject,
    text: options.text,
    // html:
  };

  // 3.Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
