const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');

const categoriesNewsList = [];

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('index', path.resolve(__dirname, 'index'));
app.set('news', path.resolve(__dirname, 'news'));

request('https://yandex.ru/news/', (err, response, body) => {
    if (err) {
        console.log(err);
    } else if(response.statusCode === 200) {
    const $ = cheerio.load(body);
    const newsLenght = $('.tabs-menu__tab .link').length;
    for(let i = 0; i < newsLenght; i++) {
      categoriesNewsList.push($('.tabs-menu__tab .link').eq(i).text())
    };
  };
});

app.use(express.urlencoded({extendet: true}));

app.get('/', (req, res) => {

  res.render('index', {
    siteName: 'Новости',
    categoriesNewsList: categoriesNewsList
  })
});

app.get('/news/', (req, res) => {
  res.render('news', {
    siteName: 'Новости',
    newsList: ['1','2','3','4','5']
  })
});

app.listen(8888, () => {
  console.log('Server has been started!');
});