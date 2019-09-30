// Сервер TODO приложения, предоставляющий REST API
// // Использование: 1) запустить скрипт 2) открыть страницу http://localhost:7777

const express       = require('express');
const mongoose      = require('mongoose');
const path          = require('path');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');

const app           = express();
app.use(cors());
app.use(express.json());

// Подключение в базе данных
mongoose.connect('mongodb://localhost:32768/tasks_db', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const Task     = require('./models/task');
const User     = require('./models/user');

// Проверка авторизации
app.use('/tasks', async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.json({ message: 'Token is not present' });
    } else {
      const [type, token] = req.headers.authorization.split(' ');
  
      jwt.verify(token, 'take your time, do not live too fast', (err, payload) => {
        if(err) {
          return res.json({ message: 'Wrong token' });
        }
  
        req.user = payload;
  
        next();
      });
    }
  });

// Отдать css
app.use('/css', express.static(path.resolve(__dirname, 'css')));

// Отдать браузеру клиентскую часть
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'lesson7.html'));
});

// Обработка запроса на авторизацию
app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({username});
  
    if (!user) {
      return res.json({ message: 'Неверный логин или пароль' });
    }
  
    if (!user.comparePassword(password)) {
      return res.json({ message: 'Неверный логин или пароль' });
    }
  
    const plainUser = JSON.parse(JSON.stringify(user));
    delete plainUser.password;
  
    res.json({
      token: jwt.sign(plainUser, 'take your time, do not live too fast', {
        expiresIn: '1d'
      }),
    });
});

// Получение списка задач
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
  
    res.json(tasks);
});

// Создание новой задачи
app.post('/tasks', async (req, res) => {
    const taskDraft = new Task(req.body);
    const task = await taskDraft.save();
    res.json(task);
});

// Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    res.json(task);
});

// Частичное изменение задачи
app.patch('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(task);
});

// Запуск сервиса
app.listen(7777, () => {
    console.log('Service has been started ...')
});


