// 1. Запоминать в куки настройки формы
// 2. Когда пользователь зашёл на сайт, искать в куках настройки
// 3. Если нашли, учитывать при отображении страницы
// 4. Если не нашли, смотреть квери-параметры в гет-запросе ?category=world&quantity=5

const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const handlebars = require('handlebars');
const request = require('request');
const cheerio = require('cheerio');

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

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
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

      res.render('index', {
        news: newsList
      });
    }
  });
});

app.listen(8800);