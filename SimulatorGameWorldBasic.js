"use strict";

// Constructor for the SimulatorGameWorldBasic class
function SimulatorGameWorldBasic() {
  this.time = 0;
  this.city = new City();
  this.restaurants = [
    new RestaurantBasic(24, 5, 23, 5, 22, 2, 'red', 4),
    new RestaurantBasic(2, 3, 3, 3, 10, 2, 'blue', 4),
    new RestaurantBasic(20, 1, 20, 2, 20, 2, 'orange', 4),
    new RestaurantBasic(3, 8, 4, 8, 4, 8, 'green', 4),
  ];
  this.busyScale = 0;
  this.clock = new Clock(23, 6);
  this.orderQueue = orderData;
  this.frame = 0;
  this.processedOrders = 0;
  this.multiplier = 1;
  this.idleTimeUnit = 1;
  this.completedOrders = 0;
  this.fleetManagementSystem = new FleetManagementSystem(10),
  this.waitingTimes = [];
  this.waitingTimesForCurrentPeriod = [];
  this.restaurantLog = 0;
}

// Handles input for the SimulatorGameWorldBasic - input handling for the buttons
SimulatorGameWorldBasic.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorldBasic
SimulatorGameWorldBasic.prototype.update = function (delta) {
  this.frame < 60 ? this.frame++ : this.frame = 0;
  this.frame === 60 || this.frame === 30 ? this.time += (1 * this.multiplier) : null;;

  this.time % 100 === 0  && this.frame === 60 ? this.busyScale++ : null;
  this.time % 100 === 0  && this.frame === 60 ? this.waitingTimesForCurrentPeriod = [] : null;
  this.busyScale > 2 ? this.busyScale = 0 : null;

  if(this.time % 3 === 0 && this.frame === 60 && this.orderQueue.length > 0) {
    let pulledOrderNumber = 1 + this.busyScale * 2;
    pulledOrderNumber < this.orderQueue.length ? null : pulledOrderNumber = this.orderQueue.length;

    for(let i = 0; i < pulledOrderNumber; i++) {
      let order = this.orderQueue.shift();
      order.startTime = this.time;
      order.pickupPosition = this.restaurants[this.restaurantLog].pickupPosition;
      this.restaurants[this.restaurantLog].addOrder(order);
      this.restaurantLog === this.restaurants.length - 1 ?  this.restaurantLog = 0 : this.restaurantLog++;
      this.processedOrders++;
      document.getElementById('processedOrderMeterBasic').innerHTML = this.processedOrders;
    }
  }

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

  document.getElementById('completedTasksMeterBasic').innerHTML = this.completedOrders;
  document.getElementById('idleTimeUnitMeterBasic').innerHTML = Math.floor(this.idleTimeUnit);
  document.getElementById('meanWaitingTimeBasic').innerHTML = meanWaitingTime.toFixed(2);
  document.getElementById('meanWaitingTimeForPeriodBasic').innerHTML = meanWaitingTimeForPeriod.toFixed(2);
  document.getElementById('SDofWaitingTimeBasic').innerHTML = stdDev.toFixed(2);
};

// Draw method for SimulatorGameWorldBasic
SimulatorGameWorldBasic.prototype.draw = function () {
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
