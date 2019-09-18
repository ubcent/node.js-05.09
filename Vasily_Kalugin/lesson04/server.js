const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const consolidate = require('consolidate');

const app = express();
const indexPath = path.resolve(__dirname, 'assets', 'index.hbs');

function getNewsTitles(newsOnPage) {
    return new Promise((pRes, pRej) => {
        const newsTitles = [];
        const requestParams = {
            url: 'https://www.rusdialog.ru/news',
            timeout: 3000,
        };
        let counter = 0;

        request(requestParams, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                const $ = cheerio.load(body);
                const news = $('.block-news-news-title');
                const newsKeys = Object.keys(news);

                while (counter < newsOnPage) {
                    if (newsKeys.includes(counter.toString())) {
                        newsTitles.push(news.eq(counter.toString()).text());
                    }

                    counter += 1;
                }

                pRes(newsTitles);
            } else {
                pRej(err);
            }
        });
    });
}

app.engine('hbs', consolidate.handlebars);
app.use(express.json());

app.use('/', (req, res, next) => {
    const { newsOnPage = 4 } = req.body;
    getNewsTitles(parseInt(newsOnPage)).then(
        newsTitles => {
            if (req.body.newsOnPage) {
                console.log(newsTitles);
                res.render(indexPath, { newsTitles });
            } else {
                req.body.newsTitles = newsTitles;
                next();
            }
        },
        err => {
            res.render(indexPath, { err });
        },
    );
});

app.get('/', (req, res) => {
    const { newsTitles } = req.body;

    res.render(indexPath, { newsTitles });
});

app.listen(9001, () => {
    console.log('Listen port 9001');
});
