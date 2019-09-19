const request = require('request');
const chererio = require('cheerio');

let app = {
    start : ()=>{
        request('https://hi-tech.mail.ru/news/', function(error, response, html){
            if(!error && response.statusCode == 200){
                console.log('----------Новости hi-tech mail.ru----------');
                let $ = chererio.load(html);
                $('.js-pgng_item').each(function(i, item){
                    console.log('********************');                    
                    let head = $(item).find('.newsitem__title-inner').text();
                    let description = $(item).find('.newsitem__text').text();
                    let time = $(item).find('.js-ago').attr('datetime');
                    time = Date.parse(time);
                    time = new Date(time);
                    let link_holder = $(item).find('.link-holder');
                    let link = $(link_holder).attr('href');
                    console.log('----------' + time.toLocaleString());
                    console.log('----------' + head);
                    console.log('----------' + description);
                    console.log('---------- https://hi-tech.mail.ru' + link);
                    console.log('********************');
                });
            }else{
                console.error('Что-то пошло не так, текст ошибки: ' + error);
            }
        });
    }
};

app.start();