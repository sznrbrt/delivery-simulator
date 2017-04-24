"use strict";

function Restaurant(x, y) {
  this.position = new Vector2(x, y);
  this.pickupPosition = new Vector2(x - 1, y);
  this.canvasPosition = new Vector2(x * 40, y * 40);
  this.openOrders = [];
  this.waitingOrders = [];
  this.closedOrders = [];
  this.vehicle = new Vehicle(23, 6, this.pickupPosition.x, this.pickupPosition.y);
}

Restaurant.prototype.update = function (delta) {
  this.vehicle.update();
};

Restaurant.prototype.draw = function () {
  Canvas2D.canvasContext.font="14px Georgia";
  Canvas2D.canvasContext.fillStyle="white";
  Canvas2D.canvasContext.fillText(this.openOrders.length, this.canvasPosition.x + 15, this.canvasPosition.y - 15);

  Canvas2D.canvasContext.fillStyle = "red";
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x, this.canvasPosition.y, 40, 40);

  this.vehicle.draw();
};

Restaurant.prototype.addOrder = function (data) {
  this.openOrders.push(data);
};
