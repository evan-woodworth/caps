'use strict';

const { expect } = require('@jest/globals');
const { ee, vendorEventManager } = require('../caps.js');

// vendorEventManager("billy bob's tackle");


describe('Testing CAPS delivery flow of events', () => {

  console.log = jest.fn();

  it('should log a pickup', async () => {
    vendorEventManager("billy bob's tackle");
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/DRIVER: picked up \d*/))
  })

  it('should log a delivery', async ()=>{
    ee.emit('delivered', {
      "customer": "byebye"
    })
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Thank you, byebye/))
  })

  it('should log any event', async ()=>{
    ee.emit('something', {
      "customer": "byebye"
    })
    expect(console.log).toHaveBeenCalledWith(expect.objectContaining({"event": "something"}))
  })

  it('should log in-transit', () => {
    let payload = {
      "store": "ben and jerry's",
      "orderId": Math.floor(Math.random() * 1000000000),
      "customer": "John Smith",
      "address" : "Seattle, WA"
    }
    ee.emit('in-transit', payload);
    expect(console.log).toHaveBeenCalledWith(expect.objectContaining({"event": "in-transit"}))
  })
})