const request = require('request');
const cheerio = require('cheerio');
const Table = require('cli-table');

request('https://ria.ru/world/', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body);

        const newsList = $('.rubric-list .list-item .list-item__title.color-font-hover-only');

        var table = new Table({
            head: [
                'Статья',
                'Ссылка'
            ]
        });
        newsList.each((key, val) =>{
            const title = $(val).text();
            const link = $(val).attr("href");
            table.push(
                [title, link]
            );

        });
        console.log("В мире. Последние новости - РИА Новости");
        console.log(table.toString());
    }
});