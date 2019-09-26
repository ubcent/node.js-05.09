/*
  * GET - Read
  * POST - Create
  * PUT - Update (full)
  * PATCH - Update (partial)
  * DELETE - Delete
  * 
  * CRUD
*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://192.168.99.100:32768/insta', { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json());

const Task = require('./models/task');
const User = require('./models/user');

app.use('/tasks', async (req, res, next) => {
  if(!req.headers.authorization) {
    return res.json({ message: 'Token is not present' });
  } else {
    const [type, token] = req.headers.authorization.split(' ');

    jwt.verify(token, 'super-duper-puper secret', (err, payload) => {
      if(err) {
        return res.json({ message: 'Wrong token' });
      }

      req.user = payload;

      next();
    });
  }
});

// Получение списка задач
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

// Получение одной задачи по id
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.json(task);
});

// Создание новой задачи
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  const savedTask = await task.save();

  res.json(savedTask);
});

// Полное изменение задачи
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);

  res.json(task);
});

// Частичное изменение задачи
app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body });

  res.json(task);
});

// Удаление одной задачи
app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  res.json(task);
});

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username});

  if(!user) {
    return res.json({ message: 'Wrong credentials' });
  }

  if(!user.comparePassword(password)) {
    return res.json({ message: 'Wrong credentials' });
  }

  const plainUser = JSON.parse(JSON.stringify(user));
  delete plainUser.password;

  res.json({
    token: jwt.sign(plainUser, 'super-duper-puper secret', {
      expiresIn: '1d'
    }),
  });
});

app.listen(8888);

// domain.com
// api.domain.com
// CORS browser -> preflight (OPTIONS)
// Access-Control-Allow-Origin

// Access-token
// Refresh-token

