'use strict';

const client = require('socket.io-client');
const PORT = process.env.PORT || 3030;

const socket = client(`http://localhost:${PORT}/caps`);

socket.on('pickup', (payload)=>{
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
  console.log(`DRIVER: delivered ${payload.orderId}`);
  socket.emit('delivered', payload);
});