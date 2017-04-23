"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurant = new Restaurant(25, 6);
  this.vehicle = new Vehicle(23, 6);
  this.clock = new Clock(23, 6);
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.time += ((1000 / 60) / 1000);

  if(this.time === 100) {
    this.restaurant.addOrder({ time: this.time, deliveryTo: { x: 5, y: 2 } });
  }
  this.restaurant.update();
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.vehicle.draw();
};
