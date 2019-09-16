const readline      = require('readline');
const request       = require('request');
const queryString   = require('query-string');
const fs            = require('fs');

if(!fs.existsSync('./apiKey.txt')){
    return console.log('Файл с ключём для API (apiKey.txt) не найден!');
}

const apiKey = fs.readFileSync('./apiKey.txt', 'utf8');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function enterText() {
    return new Promise((resolve, reject) => {
        rl.question('Наберите текст для перевода с end на rus: ', (text) => {
            if(text === "q")
                reject(text);
            resolve(text);
        });
    });
}

function translite(userText) {
    return new Promise((resolve, reject) => {
        const stringified = queryString.stringify({
            key:apiKey,
            text:userText,
            lang:'en-ru',
        });

        request.post('https://translate.yandex.net/api/v1.5/tr.json/translate?'+stringified, {},(err, response, body) => {
            body = JSON.parse(body);

            if(!err && response.statusCode === 200 && body.code === 200) {
                resolve(body);
            }
            if(err)
                reject(err);

            reject(body);
        });
    });

}

async function startTranslate() {
    try {
        const userText = await enterText();

        const result   = await translite(userText);
        
        console.log('---------------------------------');
        console.log('Перевод: ', result.text.join(', '));
        console.log('---------------------------------');
        console.log("Для завершения работы наберите q\n");

        return startTranslate();


    } catch (error) {
        rl.close();
        if(error === 'q'){
            return console.log("Завершение работы");
        }
        console.log("\nНепредвиденная ошибка");
        console.log(error);
    }
}

startTranslate();

