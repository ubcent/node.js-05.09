const express = require('express');
const path = require('path');
const consolidate = require('consolidate');

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
app.use((req, res, next) => {
  console.log('middleware');
  req.body = { name: 'Vasily Pupkin' };
  next();
});

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

app.post('/users', (req, res) => {
  console.log(req.body);
  res.send('OK');
});

app.post('/tasks', (req, res) => {
  console.log(req.body);
  res.send('OK');
});

app.get('/users/:id', (req, res) => {
  console.log(req.params.id, req.query);
  res.send('Params');
});

app.listen(8888, () => {
  console.log('Server has been started!');
});