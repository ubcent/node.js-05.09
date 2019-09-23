// Создать на основе express и handlebars веб-сервис с HTMLинтерфейсом для динамической загрузки новостей.
// Зайдя на этот сервис, пользователь сможет с помощью формы выбрать категорию новостей.
// Форма должна отправляться на сервер методом POST.
// Использование: 1) запустить скрипт 2) в браузере открыть страницу http://localhost:7777/

const express       = require('express');
const path          = require('path');
const consolidate   = require('consolidate');
const request       = require('request');
const cheerio       = require('cheerio');
const util          = require('util')

const app           = express();
const url2grab      = 'https://ria.ru/';

// Данные для отображения в шаблоне
const categories = [ 
    { categoryId: 'none',      categoryName: 'Выберите категорию новостей:'}
   ,{ categoryId: 'politics',  categoryName: 'Политика'}
   ,{ categoryId: 'world',     categoryName: 'В мире'}
   ,{ categoryId: 'economy',   categoryName: 'Экономика'}
   ,{ categoryId: 'society',   categoryName: 'Общество'}
   ,{ categoryId: 'incidents', categoryName: 'Происшествия'}
   ,{ categoryId: 'science',   categoryName: 'Наука'}
   ];

class Article {
    constructor (_url, _title, _datetime, _text) {
        this.url      = _url;
        this.title    = _title;
        this.datetime = _datetime;
        this.text     = _text;
    }
}
class Data2Render {
    constructor (_categories, _articles) {
        this.categories         = _categories;
        this.articles           = _articles;
    }
}
let   currentCategoryId = 'none';

// Шаблонизация
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// Отдать css
app.use('/css', express.static(path.resolve(__dirname, 'css')));

// Похищение новостей
async function getArticle(url, titleText) {
    const requestPromise  = util.promisify(request);
    const articleText     = [];
    let   articleDateTime = '';
    
    try {
        const response   = await requestPromise(url);
        const $ = cheerio.load(response.body);

        articleDateTime     = $('.article__info-date').eq(0).text();
        const articleTextElements = $('.article__text').toArray();

        for (articleTextElement of articleTextElements) {
            articleText.push($(articleTextElement).text());
        };

    }
    catch (err) {
        console.error(err);
    }
   
    if (articleDateTime !== '') 
        return new Article(url, titleText, articleDateTime, articleText);
    else
        return undefined; // Страница в необычном формате, обычно фотоподборка, а не новость
}


async function getArticles(url) {
    const articles       = [];
    const requestPromise = util.promisify(request);
    try {
        const response   = await requestPromise(url);
        const $ = cheerio.load(response.body);
        const articleElements = $('.list-item').toArray();

        for (articleElement of articleElements) {
            const titleElement = $('.list-item__title',articleElement);
            const subUrl       = titleElement.attr("href");
            const titleText    = titleElement.text();
            const article      = await getArticle(subUrl, titleText);
            if (article !== undefined) {
                articles.push(article);
            }
        }
    }
    catch (err) {
        console.error(err)
    }    

    return articles;
}

// Обработка запросов
app.use(express.urlencoded({ extended : false }));

function selectCategory() {
    categories.forEach( (category) => {
        if (category.categoryId === currentCategoryId) {
            category.selected = 'selected';
        } else {
            category.selected = '';
        }
    });
}

function renderResponse(res, articles)
{
    const data2Render = new Data2Render(categories, articles);
    res.render('lesson4', data2Render);
}

app.get('/', (req, res) => {
    currentCategoryId = 'none';
    selectCategory();
    renderResponse(res, []);
});

app.post('/', async (req, res) => {
    currentCategoryId = req.body.newscategory;
    if (currentCategoryId === undefined) {
        currentCategoryId = 'none';
    }
    selectCategory();

    if (currentCategoryId !== 'none') {
        const newsurl  = url2grab + currentCategoryId + '/';
        const articles = await getArticles(newsurl);
        renderResponse(res, articles);
    } else {
        renderResponse(res, []);
    }
});

// Запуск сервиса
app.listen(7777, () => {
    console.log('Service has been started ...')
});