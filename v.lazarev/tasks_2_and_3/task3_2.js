const http = require('http');
const request = require('request');
const url = require('url');

function onRequest(req, resp) {
  resp.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190921T163446Z.f0e1efa4e9a138c3.bcabba0982fd5b2433529ed4771af3565ea6901d&text=' + encodeURI(url.parse(req.url, true).query.text) + '&lang=ru-en', (err, response, body) => {
    if(err) {
      console.log(err);
    }

    if(!err && response.statusCode === 200) {
      resp.write(JSON.parse(body).text[0]);
      resp.end();
    }
  });
}

http.createServer(onRequest).listen(8800);