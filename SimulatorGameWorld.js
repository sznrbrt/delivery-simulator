"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurant = new Restaurant(24, 5);
  this.clock = new Clock(23, 6);
  this.orderQueue = [{ time: 5, deliveryTo: { x: 5, y: 2 }, id: 1 }, { time: 10, deliveryTo: { x: 4, y: 2 }, id: 2 }];
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.time += ((1000 / 60) / 1000);

  if(this.orderQueue.length > 0) {
    this.orderQueue.forEach((obj) => {
      if(Math.floor(this.time) === obj.time) {
        console.log('ORDER');
        this.restaurant.addOrder(obj);
        this.orderQueue.shift();
      }
    })
  }

  this.restaurant.update();
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.restaurant.draw();
};
