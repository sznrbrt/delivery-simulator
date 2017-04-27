"use strict";

function Restaurant(x, y, pickupX, pickupY, vehicleInitialX, vehicleInitialY, color, numOfVehicle) {
  this.color = color;
  this.position = new Vector2(x, y);
  this.pickupPosition = new Vector2(pickupX, pickupY);
  this.canvasPosition = new Vector2(x * 40, y * 40);
  this.openOrders = [];
  this.waitingOrders = [];
  this.closedOrders = [];
  this.vehicles = [];

  for(let i = 0; i < numOfVehicle; i++) {
    this.vehicles.push(new Vehicle(vehicleInitialX, vehicleInitialY, pickupX, pickupY, color));
  }
}

Restaurant.prototype.update = function (delta) {
  if(this.openOrders.length > 0) {
    this.waitingOrders = this.waitingOrders.concat(this.openOrders);
    this.openOrders = [];
  }

  this.vehicles.forEach((vehicle) => {
    if(this.waitingOrders.length > 0 && vehicle.position.equals(this.pickupPosition)) {
      vehicle.simulatedTaskTime = 100;
      vehicle.assignTask(this.waitingOrders[0]);
      this.waitingOrders.shift();
    }

    vehicle.update();
  })
};

Restaurant.prototype.draw = function () {
  Canvas2D.canvasContext.fillStyle = this.color;
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x, this.canvasPosition.y, 40, 40);
  Canvas2D.canvasContext.font="14px Georgia";
  Canvas2D.canvasContext.fillStyle="white";
  Canvas2D.canvasContext.fillText(this.waitingOrders.length, this.canvasPosition.x + 15, this.canvasPosition.y + 25);

  this.vehicles.forEach((vehicle) => {
    vehicle.draw();
  })
};

Restaurant.prototype.addOrder = function (data) {
  // console.log(data);
  this.openOrders = this.openOrders.concat([data]);
};
