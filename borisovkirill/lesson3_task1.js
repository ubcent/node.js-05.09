// Создать программу для получения информации о последних
// новостей , с выбранного вами сайта в структурированном виде.
// Вызов: node lesson3_task1.js имя_файла
// Скрипт сохраняет новости сайта ex-press.by в указанный файл
const ansi      = require('ansi');
const request   = require('request');
const cheerio   = require('cheerio');
const fs        = require('fs');

const cursor    = ansi(process.stdout);
const newsurl   = 'https://ex-press.by/rubrics/novosti-borisova'

// Параметры запуска
let logFileName = process.argv.slice(2).shift();

if (logFileName === undefined) {
    cursor.red().write('Укажите имя файла после node lesson3_task1.js').reset().write('\n');
    process.exit();
}

// Структура для сохранения новостей
class Article {
    constructor (_title, _text) {
        this.title    = _title;
        this.text     = _text;
    }
}
const articles = [];

// Запрос к сайту с новостями
request(newsurl, (err, res, body) => {
    if (!err && res.statusCode === 200) { 

        const $ = cheerio.load(body);
        const articleElements = $('.article-row');

        articleElements.each((idx, articleElement) => {
            const titleElement = $('.title',articleElement);
            const shortTextElement = $('.short-text',articleElement);
            const article = new Article(titleElement.text(),shortTextElement.text());
            articles.push(article);
        })

        // Сохранение полученных новостей в файл
        fs.writeFile(logFileName, JSON.stringify(articles), 'utf8', function (err) {
            if (err) {
                cursor.red().write(err).reset().write('\n');
                cursor.red().write('Файл с новостями не был сохранён. Это печально ...').reset().write('\n');
            }
            else {
                cursor.green().write('Файл '+logFileName+' успешно сохранён.').reset().write('\n');
                cursor.green().write('До свидания!').reset().write('\n');
            }
        }); 
    
        console.log('Сохранение новостей в файл ...');
    
        
    } else { 
        cursor.red().write('Возникла ошибка при обращении к сайту '+newsurl).reset().write('\n');
        if (err)
            console.log(err);
        process.exit();
    }
})
