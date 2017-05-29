"use strict";

// Constructor for the SimulatorGameWorldBasic class
function SimulatorGameWorldBasic() {
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
  this.fleetManagementSystem = new FleetManagementSystem(10),
  this.waitingTimes = [];
  this.waitingTimesForCurrentPeriod = [];
}

// Handles input for the SimulatorGameWorldBasic - input handling for the buttons
SimulatorGameWorldBasic.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorldBasic
SimulatorGameWorldBasic.prototype.update = function (delta) {
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
