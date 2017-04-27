"use strict";

// Constructor for the SimulatorGameWorld class
function SimulatorGameWorld() {
  this.time = 0;
  this.city = new City();
  this.restaurants = [
    new Restaurant(24, 5, 23, 5, 22, 2, 'red'),
    new Restaurant(2, 3, 3, 3, 10, 2, 'blue'),
    new Restaurant(20, 1, 20, 2, 20, 2, 'orange'),
    new Restaurant(3, 8, 4, 8, 4, 8, 'green'),
  ];
  this.clock = new Clock(23, 6);
  this.orderQueue = orderData;
  this.frame = 0;
  this.processedOrders = 0;
}

// Handles input for the SimulatorGameWorld - input handling for the buttons
SimulatorGameWorld.prototype.handleInput = function (delta) {
};

// Update method for SimulatorGameWorld
SimulatorGameWorld.prototype.update = function (delta) {
  this.frame < 60 ? this.frame++ : this.frame = 0;
  this.frame === 60 ? this.time++ : null;;

  // console.log(this.time);

  if(this.time % 3 === 0 && this.frame === 60 && this.orderQueue.length > 0) {
    let pulledOrderNumber = Math.floor(Math.random() * 3) + 1;
    pulledOrderNumber < this.orderQueue.length ? null : pulledOrderNumber = this.orderQueue.length;
    var randomRestaurantIndex =   Math.floor(Math.random()*this.restaurants.length);

    for(let i = 0; i < pulledOrderNumber; i++) {
      let order = this.orderQueue.shift();
      this.restaurants[randomRestaurantIndex].addOrder(order);
      this.processedOrders++;
      document.getElementById('processedOrderMeter').innerHTML = this.processedOrders;
    }
  }

  this.restaurants.forEach((restaurant) => restaurant.update());
};

// Draw method for SimulatorGameWorld
SimulatorGameWorld.prototype.draw = function () {
  this.clock.draw(this.time);
  this.city.draw();
  this.restaurants.forEach((restaurant) => restaurant.draw());
};
