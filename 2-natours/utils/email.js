const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Just Name <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return true;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD }
    });
  }
  // send the actual email
  async send(template, subject) {
    // Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html)
    };

    // Create a transport and send an email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPassReset() {
    await this.send('passwordReset', 'Your password reset token (valid only for 10 minutes).');
  }
}

// const sendEmail = async options => {
// 1.Create a transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD }
// });  Activate in gmail 'less secure apps' option (if you're going to use Gmail)

// 2.Define the email options
// const mailOptions = {
//   from: 'Just Name <test3@gmail.com>',
//   to: options.email,
//   subject: options.subject,
//   text: options.text
//   // html:
// };

// 3.Send the email
// await transporter.sendMail(mailOptions);
// };

module.exports = Email;
