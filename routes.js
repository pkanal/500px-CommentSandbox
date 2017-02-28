const Router = require('koa-router');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = require('./transporter');
const router = new Router();

router.post('/api/key/:email', (ctx, next) => {
  const randomBytes = crypto.randomBytes(1024).toString('base64');
  const hash = crypto.createHash('sha256');
  hash.update(randomBytes);
  try {
    sendApiKey(ctx.params.email, hash);
    ctx.body = 'Your api key has been emailed.';
  } catch(e) {
    ctx.status = e.status;
    e.body = e.message;
    console.log(e);
  }
});

const sendApiKey = (email, hash) => {
  let mailOptions = {
      from: '"API KEY" <jsgbcapikeys@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Your API Key ', // Subject line
      text: hash.digest('hex'), // plain text body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}



module.exports = router;
