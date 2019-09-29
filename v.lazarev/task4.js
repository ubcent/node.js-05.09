const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const handlebars = require('handlebars');
const request = require('request');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const url = require('url');

function resolveSource(category) {
  let source = 'https://ria.ru/';
  switch (category) {
    case 'politics':
      source+='politics/';
      break;
    case 'world':
      source+='world/';
      break;
    case 'economy':
    default:
      source+='economy/';
  }
  return source;
}

handlebars.registerHelper('ifCond', (v1, v2, options) => {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  if (req.cookies.category === undefined) {
    req.cookies.category = url.parse(req.url, true).query.category;
  }

  if (req.cookies.quantity === undefined) {
    req.cookies.quantity = url.parse(req.url, true).query.quantity;
  }

  res.render('index', {
    category: req.cookies.category,
    quantity: req.cookies.quantity
  });
});

app.post('/', (req, res) => {
  request(resolveSource(req.body.category), (err, response, body) => {
    if(err) {
      console.log(err);
    }

    if(!err && response.statusCode === 200) {
      const $ = cheerio.load(body);
      let newsList = [];

      for (let i = 0; i < parseInt(req.body.quantity, 10); i++){
        newsList.push($('.list-item__title').eq(i).text());
      }

      res.cookie('quantity', req.body.quantity);
      res.cookie('category', req.body.category);

      res.render('index', {
        category: req.body.category,
        quantity: req.body.quantity,
        news: newsList
      });

    }
  });
});

app.listen(8800);