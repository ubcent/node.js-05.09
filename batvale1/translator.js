const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function translation() {
    const wordToTranslate = await getWord();
    getTranslation(wordToTranslate);
};

function getWord() {
    return new Promise((resolve) => {
        rl.question('Введите то, что хотите перевести с русского на английский:', (response) => {
            const answer = response;
            resolve(encodeURI(answer));
            rl.close();
        });
    });
};

function getTranslation(wordToTranslate) {
    const API_KEY = 'trnsl.1.1.20190913T065644Z.b8c80497176fb775.e498b927ba6b6402c298f3165d8d4d5aa2daa718';
    const translationDirection = 'ru-en';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${wordToTranslate}&lang=${translationDirection}`;
    request(url, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                const result = JSON.parse(body);
                console.log('Перевод:', result.text[0]);
                return result.text[0];
            }
        }
    );
}

translation();