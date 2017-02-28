const koa = require('koa');
const fetch = require('node-fetch');
const cors = require('kcors');
const serve = require('koa-static');
const mount = require('koa-mount');
const router = require('./routes');
const admin = require("firebase-admin");

const serviceAccount = require('./firebaseInit.json');

const firebaseUrl = 'https://jsgbc-c5f0d.firebaseio.com';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseUrl,
});

const db = admin.database();
const ref = db.ref('/apiKeys');

ref.once('value', data => {
  console.log(data.val());
});

const app = new koa();
app.use(cors());
app.use(mount(serve('.')), '/')

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(8081);
console.log('Running on port 8081');
