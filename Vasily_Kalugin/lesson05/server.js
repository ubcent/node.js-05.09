const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/VAKTasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const taskRouter = require('./server/routes/tasks');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/tasks', taskRouter);

server.listen(8080, () => {
    console.log('Server listening on: 8080');
});
