// Создать TODO приложение с авторизацией
// Использование: 1) запустить скрипт 2) в браузере открыть страницу http://localhost:7777/tasks
// 3) для регистрации нового пользователя открыть страницу http://localhost:7777/users/add

const express       = require('express');
const path          = require('path');
const consolidate   = require('consolidate');
const mongoose      = require('mongoose');
const session       = require('express-session');
const MongoStore    = require('connect-mongo')(session);

const app           = express();

// Подключение в базе данных
mongoose.connect('mongodb://localhost:32768/tasks_db', { useNewUrlParser: true, useUnifiedTopology: true })
const Task     = require('./models/task');
const User     = require('./models/user');

// Шаблонизация
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// Отдать css
app.use('/css', express.static(path.resolve(__dirname, 'css')));

// Получить значения полей формы ввода
app.use(express.urlencoded({ extended : false }));

// Аутентификация
const passport = require('./auth');
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'wtf',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }));
  app.use(passport.initialize);
  app.use(passport.session);

  const mustBeAuthenticated = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth');
    }
  }
  app.use('/tasks', mustBeAuthenticated);

// Обработка запросов
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.render('lesson6', {tasks})
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

app.get('/users/add', async (req, res) => {
    res.render('useradd', {})
});

app.post('/users/add', async (req, res) => {
    const userDraft = new User(req.body);
    const users = await userDraft.save();
    res.redirect('/auth');
});

app.get('/auth', (req, res) => {
    const error = !!req.query.error;
    res.render('auth', {error});
});
  
app.post('/auth', passport.authenticate);
  
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
});

// Запуск сервиса
app.listen(7777, () => {
    console.log('Service has been started ...')
});
