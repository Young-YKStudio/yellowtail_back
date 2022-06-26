const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: `${process.env.EMAIL_ACCT}`,
    pass: `${process.env.EMAIL_PW}`
  },
});

const sendEmail = (options) => {

  const mailOptions = {
    from: 'YK Studio <service@ykstudio.dev>',
    to: options.to,
    subject: options.subject,
    html: options.text
  }

  try {
    transporter.sendMail(mailOptions).then(console.info).catch(console.catch)
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendEmail;