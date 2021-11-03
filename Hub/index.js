'use strict';

const socketio = require('socket.io');
const PORT = process.env.PORT || 3030;
const server = socketio(PORT);
const caps = server.of('/caps');

const logEvent = (event, payload) => {
  let log = {
    event,
    time: new Date().toString(),
    payload,
  };

  console.log('EVENT', log);
};

server.on('connection', (socket) => {
  console.log('Socket is connected', socket.id);

  socket.on('message', (payload) => {
    console.log(payload);

    socket.emit('received', {
      id: socket.id,
      payload
    });
  });
});

caps.on('connection', (socket) => {
  console.log(`${socket.id} connected to caps server`);

  socket.on('join', (payload) => {
    socket.join(payload);
  });

  socket.on('message', (payload) => {
    caps.to(payload.room).emit(payload.message);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    caps.emit('pickup', payload);
  })

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload)
  })

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    caps.to(payload.store).emit('delivered', payload)
  })
});

