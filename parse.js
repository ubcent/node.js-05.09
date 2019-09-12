const request = require('request');
const cheerio = require('cheerio');

request('https://www.banki.ru/products/currency/cash/usd/sankt-peterburg/', (err, response, body) => {
  if(!err && response.statusCode === 200) {
    const $ = cheerio.load(body);

    const rate = $('.currency-table__large-text').eq(1).text();

    console.log('Курс доллара: %s рублей', rate);
  }
});