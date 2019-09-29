const request = require('request');
const cheerio = require('cheerio');

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

request('https://lenta.ru/', (err, response, body) => {
  if(err) {
    console.log(err);
  }

  if(!err && response.statusCode === 200) {
    const $ = cheerio.load(body);

    console.log('Последние новости:');

    for (let i = 0; i < 5; i++){
      console.log($('.item').eq(i).text().splice(5, 0, ' '));
    }
  }
});