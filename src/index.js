const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'static')))
app.get('/', (_, res) => {
  res.sendFile(__dirname, '/static/index.html');
});

io.on('connection', socket => {

  socket.connectedRoom = '';

  socket.leave(socket.connectedRoom);

  socket.on('connect to room', room => {
    switch (room) {
      case 'room1':
        socket.join('room1');
        socket.connectedRoom = 'room1';
        break;
      case 'room2':
        socket.join('room2');
        socket.connectedRoom = 'room2';
        break;
      case 'room3':
        socket.join('room3');
        socket.connectedRoom = 'room3';
        break;
      default:
        break;
    };
  });

  socket.on('message', message => {
    const room = socket.connectedRoom;

    io.to(room).emit('send message', {
      message: message,
      room: room
    });
  });

});

httpServer.listen(3000, () => {
  console.log('server running on port http://localhost:3000');
});