"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurants = [
    new Restaurant(24, 5, 23, 5, 'red'),
    new Restaurant(2, 3, 3, 3, 'blue'),
    new Restaurant(20, 1, 20, 2, 'orange'),
    new Restaurant(3, 8, 4, 8, 'green')
  ];
  this.busyScale = 0;
  this.clock = new Clock(23, 6);
  this.orderQueue = orderData;
  this.frame = 0;
  this.processedOrders = 0;
  this.multiplier = 1;
  this.idleTimeUnit = 1;
  this.completedOrders = 0;
  this.fleetManagementSystem = new FleetManagementSystem(16),
  this.waitingTimes = [];
  this.waitingTimesForCurrentPeriod = [];
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.frame < 60 ? this.frame++ : this.frame = 0;
  this.frame === 60 || this.frame === 30 ? this.time += (1 * this.multiplier) : null;;

  this.time % 100 === 0  && this.frame === 60 ? this.busyScale++ : null;
  this.time % 100 === 0  && this.frame === 60 ? this.waitingTimesForCurrentPeriod = [] : null;
  this.busyScale > 3 ? this.busyScale = 1 : null;

  if(this.time % 3 === 0 && this.frame === 60 && this.orderQueue.length > 0) {
    let pulledOrderNumber = Math.round(Math.random() * 3) + this.busyScale * 2;
    pulledOrderNumber < this.orderQueue.length ? null : pulledOrderNumber = this.orderQueue.length;

    for(let i = 0; i < pulledOrderNumber; i++) {
      let randomRestaurantIndex =   Math.floor(Math.random() * this.restaurants.length);
      let order = this.orderQueue.shift();

      order.startTime = this.time;
      order.pickupPosition = this.restaurants[randomRestaurantIndex].pickupPosition;

      this.restaurants[randomRestaurantIndex].addOrder(order);
      this.fleetManagementSystem.addOrder(order);
      this.processedOrders++;
      document.getElementById('processedOrderMeter').innerHTML = this.processedOrders;
    }
  }

  this.fleetManagementSystem.update();
  this.restaurants.forEach((restaurant) => restaurant.update());

  let meanWaitingTime = this.waitingTimes.reduce((a, b) => a + b, 0) / (this.waitingTimes.length === 0 ? 1 : this.waitingTimes.length);
  let meanWaitingTimeForPeriod = this.waitingTimesForCurrentPeriod.reduce((a, b) => a + b, 0) / (this.waitingTimesForCurrentPeriod.length === 0 ? 1 : this.waitingTimesForCurrentPeriod.length);

  // SD
  let squareDiffs = this.waitingTimes.map(function(value){
    let diff = value - meanWaitingTime;
    let sqr = diff * diff;
    return sqr;
  });


  let avgSquareDiff = average(squareDiffs);

  let stdDev = Math.sqrt(avgSquareDiff);

  let period;
  switch (this.busyScale) {
    case 0:
      period = 'Low demand'
      break;
    case 1:
      period = 'Mid demand'
      break;
    case 2:
      period = 'High demand'
      break;
    default:

  }

  document.getElementById('completedTasksMeter').innerHTML = this.completedOrders;
  document.getElementById('idleTimeUnitMeter').innerHTML = Math.floor(this.idleTimeUnit);
  document.getElementById('meanWaitingTime').innerHTML = meanWaitingTime.toFixed(2);
  document.getElementById('SDofWaitingTime').innerHTML = stdDev.toFixed(2);
  document.getElementById('period').innerHTML = period;
  document.getElementById('meanWaitingTimeForPeriod').innerHTML = meanWaitingTimeForPeriod.toFixed(2);
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.restaurants.forEach((restaurant) => restaurant.draw());
  this.fleetManagementSystem.draw();
};

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = data.length > 0 ? sum / data.length : 0;
  return avg;
}
