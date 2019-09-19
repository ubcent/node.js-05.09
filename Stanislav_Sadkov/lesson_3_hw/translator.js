//trnsl.1.1.20190916T135949Z.2993ff9521ebc71a.8f00413674996d3970327ccf73fab12b99308ee0
const readline = require('readline');
const reader = readline.createInterface(process.stdin, process.stdout);
const request = require('request');
//Создаем приложение 
const app = {
    translate: function(text){
        //Сохраняем область видимости объекта
        let that = this;
        //Запрос к API Яндекс
        request({
            method: 'POST',
            uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
            form: {
                key: 'trnsl.1.1.20190916T135949Z.2993ff9521ebc71a.8f00413674996d3970327ccf73fab12b99308ee0',
                text: text,
                lang: 'ru',
                format: 'plain'
            }
        }, (error, response, body)=>{
            let textTranslate = JSON.parse(body);
            console.log('Перевод: ', textTranslate.text[0]);
            that.start();
        })
    },
    start: function(){
        let that = this;
        reader.question('Введите текст для перевода на русский (выйти ctrl+c): ', function(text) {
            if (text) {
                that.translate(text);
            }else{
                console.log('Ошибка');
                that.start();
            }
        });
    }
}

app.start();