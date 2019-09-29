const express       = require('express');
const consolidate   = require('consolidate');
const path          = require('path');
const mongoose      = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/to-do', { useUnifiedTopology: true, useNewUrlParser: true });

//подключение шаблонизатора
app.engine('twig', consolidate.twig);
app.set('view engine', 'twig');
app.set('views', path.resolve(__dirname, 'views'));

//подключение middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//создание сервера
app.listen(3000, () =>{
    console.log('Сервер запущен по адресу: http://localhost:3000/');
});

module.exports = {
    app: app,
    mongoose: mongoose,
};