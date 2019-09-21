const express       = require('express');
const request       = require('request');
const cheerio       = require('cheerio');
const consolidate   = require('consolidate');
const path          = require('path');
const fs            = require('fs');
const queryString   = require('query-string');

const app = express();

//подключение шаблонизатора
app.engine('twig', consolidate.twig);
app.set('view engine', 'twig');
app.set('views', path.resolve(__dirname, 'views'));

//создание сервера
app.listen(3000);

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    getTitles().then((result) =>{
        return res.render('index',{
            themes: result
        });
    }, (err) => {
        return res.render('error',{
            error: err
        });
    });
});

app.get('/theme/:id', (req, res) => {

    const filter = Object.assign({
        name : '',
        count: 'all',
    }, req.query);

    getTheme(req.params.id, filter).then((result) =>{
        return res.render('theme',{
            articles: result,
            filter: filter
        });
    }, (err) => {
        return res.render('error',{
            error: err
        });
    });
});

app.get('/translator', (req, res) => {

    return res.render('translator');
});

app.post('/translator', (req, res) => {

    if(!fs.existsSync('./apiKey')){
        return res.render('error',{
            error: 'Файл с ключём для API (apiKey) не найден!'
        });
    }

    const apiKey = fs.readFileSync('./apiKey', 'utf8');
    const stringified = queryString.stringify({
        key : apiKey,
        text: req.body.text,
        lang:'en-ru',
    });

    request.post({
        url : 'https://translate.yandex.net/api/v1.5/tr.json/translate?'+stringified,
        json: true
    }, (err, response, body) => {

        if(!err && response.statusCode === 200 && body.code === 200) {
            return res.render('translator', {
                result: body.text.join(', '),
                text:   req.body.text,
            });
        }

        if(err){
            return res.render('error',{
                error: err
            });
        }

        return res.render('error',{
            error: body
        });
    });
});

getTitles = () =>{
    return new Promise((resolve, reject) => {
        request('https://ria.ru/', (err, response, body) => {
            if(!err && response.statusCode === 200) {

                const $      = cheerio.load(body);
                let themes   = [];
                const titles = $('a.cell-extension__item-link');

                titles.each((key, val) =>{

                    const link = $(val).attr('href');

                    if(link.search(/http/)){
                        themes.push({
                            title : $(val).text(),
                            link  : link
                        })
                    }
                });
                resolve(themes)
            }
            reject(err);
        });
    });
};

getTheme = (theme, filter) => {
    return new Promise((resolve, reject) => {
        request('https://ria.ru/'+theme, (err, response, body) => {
            if(!err && response.statusCode === 200) {
                const $ = cheerio.load(body);

                const newsList = $('.rubric-list .list-item .list-item__title.color-font-hover-only');

                let list = [];
                const maxCount = filter.count ? parseInt(filter.count) : false;
                const search   = filter.name  ? filter.name : false;

                let i = 0;
                newsList.each((key, val) =>{
                    i++;

                    const title = $(val).text();
                    let link    = $(val).attr('href');

                    link = link.search(/http/) ? 'https://ria.ru'+link : link;

                    if(search && title.search(new RegExp(search, 'i')) === -1){
                        return true;
                    }

                    if(maxCount && i >= maxCount){
                        return false;
                    }

                    list.push({
                        'title': title,
                        'link':  link,
                    });

                });

                resolve(list);
            }
            reject(err);
        });
    });
};