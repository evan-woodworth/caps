'use strict';

const EventEmitter = require('events');
class varEmitter extends EventEmitter {
  emit (type, ...args) {
    let d = new Date();
    let date = d.toISOString();
    console.log({
      event: type,
      time: date,
      payload: [...args],
    })
    super.emit('*', ...args);
    return super.emit(type, ...args) || super.emit('', ...args);
  }
}
const ee = new varEmitter();

ee.on('pickup', async (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  ee.emit('in-transit', payload);

  setTimeout(()=>{
    console.log(`DRIVER: delivered ${payload.orderId}`);
    ee.emit('delivered', payload);
  })
}, 5000);

ee.on('*', (payload) => {
  
})

const vendorEventManager = (storeName, customerName = "Valued Customer", address = "Seattle, WA") => {
  let payload = {
    "store": storeName,
    "orderId": Math.floor(Math.random() * 1000000000),
    "customer": customerName,
    "address" : address
  }
  ee.emit('pickup', payload);
}

ee.on('delivered', (payload)=>{
  console.log (`Thank you, ${payload.customer}`);
})

module.exports = {
  ee,
  vendorEventManager,
};