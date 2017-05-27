"use strict";

var orderCoordinates = deliveryTargetCoordinates;
// var orderCoordinates = [[5,2], [4,2], [4,8], [4,9], [4,10]];

//
// var orderData = [
//   { time: 5,  deliveryTo: { x: 5, y: 2 }, id: 1 },
//   { time: 6,  deliveryTo: { x: 4, y: 2 }, id: 2 },
//   { time: 7,  deliveryTo: { x: 5, y: 2 }, id: 3 },
// ];

var orderData = SampleOrderData;//generateRandomOrders(300);

var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orderData, null, 4));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href", dataStr);
dlAnchorElem.setAttribute("download", "orderData.json");

function generateRandomOrders(quantity) {
  var orders = [];
  for(let i = 0; i < quantity; i++) {
    let _derliveryTo = chooseOneRandomly(orderCoordinates);
    let order = { id: i, deliveryTo: { x: _derliveryTo[0], y: _derliveryTo[1]} };
    orders.push(order);
  }

  return orders;
}

function chooseOneRandomly(array) {
  let idx = Math.floor(Math.random() * array.length);
  return array[idx]
}
