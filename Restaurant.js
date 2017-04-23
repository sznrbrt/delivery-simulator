"use strict";

function Restaurant(x, y) {
  this.position = new Vector2(x, y);
  this.openOrders = [];
  this.waitingOrders = [];
  this.closedOrders = [];
}

Restaurant.prototype.update = function (delta) {
};

Restaurant.prototype.draw = function () {
};

Restaurant.prototype.addOrder = function (data) {
  this.openOrders.push(data);
};
