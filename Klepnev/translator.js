const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const startTranslate = () =>  {
    rl.question('Введите чторибудь на англиском.\n', (data) => {
        const key = 'trnsl.1.1.20190921T142234Z.05ee2f3b7242977b.1ed5836c6bd782f47aa3add043b18b459e104447';
		const translateYandex = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=en-ru&text=${data}`;
        request(translateYandex,
            (err, response, body) => {
                if (err) {
                    console.log(err);
                } else if (data === 'exit') {
                    console.log('Пока!');
                    rl.close();
                } else if (response.statusCode === 200) {
                    let value = JSON.parse(body);
                    console.log(`${data} в переводе означает : ${value.text}`);
                    startTranslate();
                };

            });
    });
}
startTranslate()