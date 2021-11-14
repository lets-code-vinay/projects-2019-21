const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "noreply@facebookclone.com" };

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};
