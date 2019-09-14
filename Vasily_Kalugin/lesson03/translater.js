const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getTranslation(text) {
    const promiss = new Promise((pRes, pRej) => {
        const key = 'trnsl.1.1.20190914T160514Z.bb8d3e64ec3b31be.eb50adcef77d561239c08db909d782c574cdfbca';
        const lang = 'en-ru';
        const format = 'plain';
        const options = '1';
        const mainPath = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
        const URL = `${mainPath}?key=${key}&lang=${lang}&text=${encodeURI(text)}&format=${format}&options=${options}`;

        request({ timeout: 3000, uri: URL }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                pRes(`Translate into Russian: ${JSON.parse(body).text[0]}`);
            } else if (err !== null && err.code === 'ETIMEDOUT') {
                pRes('error: Timed out');
            } else if (body) {
                answer = JSON.parse(body);
                pRes(`(error:${answer.code}) ${answer.message}`);
            } else {
                pRes(err);
            }
        });
    });

    return promiss;
}

function getTranslable() {
    const promiss = new Promise((p_res, p_rej) => {
        rl.question('Write words to translate: ', answer => {
            p_res(answer);
        });
    });

    return promiss;
}

async function letTranslate() {
    const translatableText = await getTranslable();
    const translatedText = await getTranslation(translatableText);
    await console.log(translatedText);
    await letTranslate();
}

letTranslate();
