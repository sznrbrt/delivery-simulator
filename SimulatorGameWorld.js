"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurant = new Restaurant(25, 6);
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.time += 1;
  this.restaurant.update();
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.city.draw();
};
