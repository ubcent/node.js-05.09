// Создать переводчик слов с английского на русский,
// который будет обрабатывать входящие GET запросы и возвращать ответы,
// полученные через API Яндекс.Переводчика

// Использование: 1) запустить скрипт 2) в браузере открыть страницу http://localhost:7777/Ваш английский текст

const http       = require('http');
const url        = require('url');
const request2ya = require('request');

http.createServer((request,response) => {
    const parameters = url.parse(request.url,true);
    const ya_key     = 'trnsl.1.1.20190916T092240Z.fc74ca045f50bca9.722a3146c8063807c2be6e035848ad3bfe90d2f1';

    if (parameters.href === '/') { // Если пользователь не указал текст для перевода, дать ему подсказку
        response.writeHead(200, { 
            'Content-Type' : 'text/html; charset=utf-8'
        });
    
        response.write('Пример использования: <a href="http://localhost:7777/I%20am%20hungry">http://localhost:7777/I%20am%20hungry</a>');
        response.end();
    }
    else
    if (parameters.href !== '/favicon.ico') { // Если это не попытка скачать иконку сайта, то можно перевести

        const url2translate  = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+ya_key+'&lang=en-ru&text='+parameters.href.substring(1);

        request2ya(url2translate, (err, res, body) => {
            if (!err && res.statusCode === 200) { // Ответ сервера при успехе
                response.writeHead(200, { 
                    'Content-Type' : 'text/html; charset=utf-8'
                });
            
                response.write(body);
                response.end();
            } else { // Ответ сервера при ошибке
                response.writeHead(200, { 
                    'Content-Type' : 'text/html; charset=utf-8'
                });
            
                response.write('Возникла ошибка при попытке перевести с английского: '+decodeURI(parameters.href.substring(1)));
                response.write(err);
                response.end();
            }
        })
    }
}).listen(7777);
