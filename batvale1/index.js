const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

//init
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:32768/task_db', {useNewUrlParser: true, useUnifiedTopology: true});
const Task = require('./models/task');
//end init

//routing
app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'home.html'),
    )
});

app.get('/news', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, './views/news.html'),
    )
});

app.get('/tasks_list', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, './views/tasks_list.html'),
    )
});
//end routing

//request
app.post('/news', (req, res) => {
    request('https://dota2.ru/', (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const dataToReturn = [];
            const $ = cheerio.load(body);
            const news = $('#news-categories-blocks h3');
            let itemsToShow;
            if (+req.body.quantityToShow && +req.body.quantityToShow < news.length) {
                itemsToShow = +req.body.quantityToShow;
            } else {
                itemsToShow = news.length;
            }
            for (let i = 0; i < itemsToShow; i++) {
                dataToReturn.push({newsHeader: news.eq(i).text()});
            }
            res.send(dataToReturn);
        }
    });
});

app.post('/tasks_list', async (req, res) => {
    const result = await Task.find();
    res.send(result);
});

app.post('/tasks_list/add', async (req, res) => {
    const result = await Task.find();
    let id = 0;
    if (result.length) {
        for (let i = 0; i < result.length; i++) {
            id = (id > result[i].uniq_id) ? id : result[i].uniq_id;
        }
    }
    id++;
    const elToAdd = {
        uniq_id: id,
        content: req.body.currentContent,
        done: false
    };
    Task.create(
        elToAdd
    , (err, el) => {
        res.send(el);
    });

});

app.post('/tasks_list/remove', async (req, res) => {
    const result = await Task.find();
    const elToDelete = {
        uniq_id: req.body.uniq_id,
    };
    Task.deleteOne(
        elToDelete
        , (err, el) => {
            res.send(el);
        });

});

app.post('/tasks_list/update', async (req, res) => {
    const result = await Task.find();
    Task.updateOne(
        {uniq_id: +req.body.uniq_id},
        {$set: {
                'content': req.body.content,
                'done': req.body.done
            }
        }
        , (err, el) => {
            res.send(el);
        });
});
//end requests

app.listen(8888, () => {
    console.log('Server has been started.');
});


