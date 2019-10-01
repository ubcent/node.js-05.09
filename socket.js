const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:32768/insta', { useUnifiedTopology: true, useNewUrlParser: true });

const Message = require('./models/message');
const messageRouter = require('./routes/message');

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

app.use('/messages', messageRouter);

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'socket.html'),
  );
});

io.on('connection', (socket) => {
  console.log('someone has connected', socket.id);

  socket.on('join', (roomName) => {
    socket.join(roomName);
  });

  socket.on('message', async (body) => {
    const message = new Message(body);
    const savedMessage = await message.save();

    if(body.to) {
      socket.in(body.to).emit('message', savedMessage);
    } else {
      socket.broadcast.emit('message', savedMessage);
      socket.emit('message', savedMessage);
    }
  });  

  socket.on('disconnect', () => {
    console.log('someone has disconnected');
  });
});

const nsPrinters = io.of('/printers');
nsPrinters.on('connection', (socket) => {
  console.log('socket has been connected to printers namespace');
});

server.listen(8888, () => {
  console.log('Server has been started!');
});