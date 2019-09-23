const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:32775/insta', { useUnifiedTopology: true, useNewUrlParser: true });

const User = require('./models/user');

const app = express();

// шаблонизация
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static(
  path.resolve(__dirname, 'static')
));

// body-parser (express 3 и раньше)
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/', (req, res, next) => {
  console.log('all');
  next();
});

app.get('/', (req, res) => {
  res.render('user', {
    fullName: 'Vasya Pupkin',
    achievements: ['Победил в конкурсе', 'Лучший работник месяца']
  });
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();

  res.send(savedUser);
});

app.post('/tasks', (req, res) => {
  console.log(req.body);
  res.send('OK');
});

app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});

app.listen(8888, () => {
  console.log('Server has been started!');
});