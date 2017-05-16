"use strict";

function Restaurant(x, y, pickupX, pickupY, color) {
  this.color = color;
  this.position = new Vector2(x, y);
  this.pickupPosition = new Vector2(pickupX, pickupY);
  this.canvasPosition = new Vector2(x * 40, y * 40);
  this.openOrders = [];
  this.waitingOrders = [];
  this.closedOrders = [];
}

Restaurant.prototype.update = function (delta) {
  if(this.openOrders.length > 0) {
    this.waitingOrders = this.waitingOrders.concat(this.openOrders);
    this.openOrders = [];
  }


  Game.gameWorld.fleetManagementSystem.fleetVehicles.forEach((vehicle) => {
    if(this.waitingOrders.length > 0 && vehicle.position.equals(this.pickupPosition)) {
      // Check if vehicle here for this task
      if(vehicle.tasks.length === 1 && this.waitingOrders[0]) {
        if(vehicle.tasks[0].id === this.waitingOrders[0].id) {
          this.closedOrders.push(this.waitingOrders[0]);
          this.waitingOrders.shift();
        }
      }
    }
  })
};

Restaurant.prototype.draw = function () {
  Canvas2D.canvasContext.fillStyle = this.color;
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x, this.canvasPosition.y, 40, 40);
  Canvas2D.canvasContext.font="14px Georgia";
  Canvas2D.canvasContext.fillStyle="white";
  Canvas2D.canvasContext.fillText(this.waitingOrders.length, this.canvasPosition.x + 15, this.canvasPosition.y + 25);
};

Restaurant.prototype.addOrder = function (data) {
  this.openOrders = this.openOrders.concat([data]);
};
