const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Введите английское слово: ');
rl.on('line', (line) => {
    request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190912T184644Z.a832dd14fa4d0fc8.93f6df0503b48772d41ea3c98e45947bf1a28344&lang=en-ru&text=${line}`,
        (err, response, body) => {
            if (err) {
                console.log('Ошибка: ', err);
            } else if (!err && response.statusCode === 200) {
                let translate = JSON.parse(body);
                console.log('Перевод: ' + '\r\n' + translate.text[0]);
            }
        })
});