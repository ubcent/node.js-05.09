const http = require('http');
const url = require('url');

http.createServer((request, response) => {
  const params = url.parse(request.url, true);
  console.log(params);
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  });
  response.write('Здравствуй, товарищ!');
  response.end();
}).listen(8888);