const http = require('http');
const https = require('https');

https.get('https://geekbrains.ru', (res) => {
  console.log(res.statusCode);
}).on('error', (err) => {
  console.log(err);
});