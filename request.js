// axios
// NFR (non-functional requirements или quality attributes)
const request = require('request');

request('https://geekbrains.ru', (err, response, body) => {
  if(!err && response.statusCode === 200) {
    console.log(body);
  }
});