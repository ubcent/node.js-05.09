const request = require('request');
const cheerio = require('cheerio');

request('https://dota2.ru/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        console.log('ok!');
        const $ = cheerio.load(body);

        const news = $('#news-categories-blocks h3');
        console.log(news.length);
        for (let i = 0; i < news.length; i++) {
            console.log(i + 1 + '. ' + news.eq(i).text());
        }
    }
});


