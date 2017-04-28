"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurants = [
    new Restaurant(24, 5, 23, 5, 22, 2, 'red', 2),
    new Restaurant(2, 3, 3, 3, 10, 2, 'blue', 3),
    new Restaurant(20, 1, 20, 2, 20, 2, 'orange', 2),
    new Restaurant(3, 8, 4, 8, 4, 8, 'green', 2),
  ];
  this.clock = new Clock(23, 6);
  this.orderQueue = orderData;
  this.frame = 0;
  this.processedOrders = 0;
  this.multiplier = 1;
  this.idleTimeUnit = 1;
  this.completedOrders = 0;
  this.waitingTimes = [];
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.frame < 60 ? this.frame++ : this.frame = 0;
  this.frame === 60 ? this.time += (1 * this.multiplier) : null;;

  // console.log(this.time);

  if(this.time % 3 === 0 && this.frame === 60 && this.orderQueue.length > 0) {
    let pulledOrderNumber = Math.floor(Math.random() * 4) + 1;
    pulledOrderNumber < this.orderQueue.length ? null : pulledOrderNumber = this.orderQueue.length;
    var randomRestaurantIndex =   Math.floor(Math.random()*this.restaurants.length);

    for(let i = 0; i < pulledOrderNumber; i++) {
      let order = this.orderQueue.shift();
      order.startTime = this.time;
      this.restaurants[randomRestaurantIndex].addOrder(order);
      this.processedOrders++;
      document.getElementById('processedOrderMeter').innerHTML = this.processedOrders;
    }
  }

  this.restaurants.forEach((restaurant) => restaurant.update());

  this.waitingTimes.length

  let meanWaitingTime = this.waitingTimes.reduce((a, b) => a + b, 0) / (this.waitingTimes.length === 0 ? 1 : this.waitingTimes.length);

  // SD
  let squareDiffs = this.waitingTimes.map(function(value){
    let diff = value - meanWaitingTime;
    let sqr = diff * diff;
    return sqr;
  });


  let avgSquareDiff = average(squareDiffs);

  let stdDev = Math.sqrt(avgSquareDiff);

  document.getElementById('completedTasksMeter').innerHTML = this.completedOrders;
  document.getElementById('idleTimeUnitMeter').innerHTML = Math.floor(this.idleTimeUnit);
  document.getElementById('meanWaitingTime').innerHTML = meanWaitingTime.toFixed(2);
  document.getElementById('SDofWaitingTime').innerHTML = stdDev.toFixed(2);
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.restaurants.forEach((restaurant) => restaurant.draw());
};

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = data.length > 0 ? sum / data.length : 0;
  return avg;
}
