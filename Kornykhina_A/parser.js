const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const boxen = require('boxen');

request('https://ria.ru/world/', (err, response, html) => {

  if (!err && response.statusCode === 200) {
    const $ = cheerio.load(html);
    console.log(boxen("РИА Новости", {
      padding: 1,
      margin: 1,
      borderStyle: 'bold',
      backgroundColor: 'blue',
      borderColor: 'magentaBright',
    }));

    for (let i = 0; i < 10; i++) {
      let news = $('.list-item__title').eq(i).text().trim() + '\n';
      console.log(news);
    }
  }
});

request('https://habr.com/ru/top/', (err, response, html) => {

  if (!err && response.statusCode === 200) {
    const $ = cheerio.load(html);
    console.log(boxen("Habr", {
      padding: 1,
      margin: 1,
      borderStyle: 'bold',
      backgroundColor: 'blue',
      borderColor: 'magentaBright',
    }));
    for (let i = 0; i < 10; i++) {
      let news = $('.post__title').eq(i).text().trim() + '\n';
      console.log(news);
    }
  }
});