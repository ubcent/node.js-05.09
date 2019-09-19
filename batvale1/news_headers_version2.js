const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'index.html'),
    )
});

app.post('/', (req, res) => {
    request('https://dota2.ru/', (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const dataToReturn = [];
            const $ = cheerio.load(body);
            const news = $('#news-categories-blocks h3');
            let itemsToShow;
            if (+req.body.quantityToShow && +req.body.quantityToShow < news.length) {
                itemsToShow = +req.body.quantityToShow;
            } else {
                itemsToShow = news.length;
            }
            for (let i = 0; i < itemsToShow; i++) {
                dataToReturn.push({newsHeader: news.eq(i).text()});
            }
            res.send(dataToReturn);
        }
    });
});

app.listen(8888, () => {
    console.log('Server has been started.');
});


