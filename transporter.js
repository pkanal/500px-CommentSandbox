const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jsgbcapikeys@gmail.com',
        pass: 'jsgbcKeyEmailss'
    }
});


module.exports = transporter;
