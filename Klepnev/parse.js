const request = require('request');
const cheerio = require('cheerio');

request('https://yandex.ru/news/', (err, response, body) => {
    if (err) {
        console.log(err);
    } else if(response.statusCode === 200) {
    const $ = cheerio.load(body);
    const newsLenght = $('.story__title .link').length;
    for(let i = 0; i < newsLenght; i++) {
        console.log($('.story__title .link').eq(i).text());
    };
  };
});