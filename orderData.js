var orderCoordinates = deliveryTargetCoordinates;
// var orderCoordinates = [[5,2], [4,2], [4,8], [4,9], [4,10]];

//
// var orderData = [
//   { time: 5,  deliveryTo: { x: 5, y: 2 }, id: 1 },
//   { time: 6,  deliveryTo: { x: 4, y: 2 }, id: 2 },
//   { time: 7,  deliveryTo: { x: 5, y: 2 }, id: 3 },
// ];

var orderData = generateRandomOrders(200);

function generateRandomOrders(quantity) {
  var orders = [];
  for(let i = 0; i < quantity; i++) {
    let time = (i * 2) - 1;
    let _derliveryTo = chooseOneRandomly(orderCoordinates);
    let order = { id: i, time: time, deliveryTo: { x: _derliveryTo[0], y: _derliveryTo[1]} };
    orders.push(order);
  }

  return orders;
}

function chooseOneRandomly(array) {
  let idx = Math.floor(Math.random() * array.length);
  return array[idx]
}
