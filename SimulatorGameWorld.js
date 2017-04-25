"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurants = [new Restaurant(24, 5, 23, 5, 22, 2, 'red'), new Restaurant(2, 3, 3, 3, 10, 2, 'blue')];
  this.clock = new Clock(23, 6);
  this.orderQueue = orderData;
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
        var randomRestaurantIndex = Math.floor(Math.random()*this.restaurants.length);
        this.restaurants[randomRestaurantIndex].addOrder(obj);
        document.getElementById('processedOrderMeter').innerHTML = parseInt(document.getElementById('processedOrderMeter').innerHTML) + 1;
        this.orderQueue.shift();
      }
    })
  }

  this.restaurants.forEach((restaurant) => restaurant.update());
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.restaurants.forEach((restaurant) => restaurant.draw());
};
