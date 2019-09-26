// Создать TODO приложение
// Использование: 1) запустить скрипт 2) в браузере открыть страницу http://localhost:7777/tasks

const express       = require('express');
const path          = require('path');
const consolidate   = require('consolidate');
const mongoose      = require('mongoose');

const app           = express();

// Подключение в базе данных
mongoose.connect('mongodb://localhost:32768/tasks_db', { useNewUrlParser: true, useUnifiedTopology: true })
const Task = require('./models/task');

// Шаблонизация
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// Отдать css
app.use('/css', express.static(path.resolve(__dirname, 'css')));

// Обработка запросов
app.use(express.urlencoded({ extended : false }));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.render('lesson5', {tasks})
});

app.post('/tasks/add', async (req, res) => {
    const taskDraft = new Task(req.body);
    const task = await taskDraft.save();
    res.redirect('/tasks');
});

app.post('/tasks/complete', async (req, res) => {
    await Task.updateOne({_id: req.body.id}, { $set: { isCompleted: true} });
    res.redirect('/tasks');
});

app.post('/tasks/uncomplete', async (req, res) => {
    await Task.updateOne({_id: req.body.id}, { $set: { isCompleted: false} });
    res.redirect('/tasks');
});

app.post('/tasks/delete', async (req, res) => {
    await Task.deleteOne({_id: req.body.id});
    res.redirect('/tasks');
});

// Запуск сервиса
app.listen(7777, () => {
    console.log('Service has been started ...')
});


