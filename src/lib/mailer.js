const nodemailer = require('nodemailer')


module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8f69f088f9e9c6",
    pass: "b87133127d0b9d"
  }
});
