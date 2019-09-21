const request = require('request');
const cheerio = require('cheerio');

request('https://www.rusdialog.ru/news', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body);
        const news = $('.block-news-news-title');

        Object.keys(news).forEach(key => {
            if (parseInt(key)) {
                console.log(`${key.padStart(2, '0')}. ${news.eq(key).text()}`);
            }
        });
    }
});
