'use strict';

const client = require('socket.io-client');
const PORT = process.env.PORT || 3030;
const faker = require('faker');
const store = 'Awesome Store'

const socket = client(`http://localhost:${PORT}/caps`);

socket.emit('join', store);


socket.on('received', console.log);
socket.on('delivered', (payload) => {
  console.log(`Thank you, ${payload.customer}`);
})

function pickup(storeName) {
  const pickupPayload = {
    'store': storeName,
    'orderId': faker.random.alphaNumeric(15),
    'customer': faker.name.findName(),
    'address': faker.address.streetAddress(),
  }
  socket.emit('pickup', pickupPayload);
}

pickup(store);