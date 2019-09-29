const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://192.168.99.100:32768/insta', { useUnifiedTopology: true, useNewUrlParser: true });

const Task = require('./models/task');
const User = require('./models/user');
const passport = require('./auth');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static(
  path.resolve(__dirname, 'static')
));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'super secret phrase',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize);
app.use(passport.session);

app.use(express.urlencoded({ extended: false }));

const mustBeAuthenticated = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth');
  }
}

app.use('/tasks', mustBeAuthenticated);

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();

  res.render('tasks', {tasks})
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  const savedTask = await task.save();

  res.redirect('/tasks');
});

app.post('/tasks/complete', async (req, res) => {
  await Task.updateOne({_id: req.body.id}, { $set: { completed: true } });

  res.redirect('/tasks');
});

app.post('/tasks/delete', async (req, res) => {
  await Task.deleteOne({_id: req.body.id});

  res.redirect('/tasks');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const user = new User(req.body);
  const savedUser = await user.save();

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

app.listen(8888);