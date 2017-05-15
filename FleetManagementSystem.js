"use strict";

function FleetManagementSystem(numOfVehicles) {
  this.fleetVehicles = [];
  this.openOrderQueue = [];

  for(let i = 0; i < numOfVehicles; i++) {
    this.fleetVehicles.push(new FleetVehicle(20, 2));
  }
}

FleetManagementSystem.prototype.update = function () {
  if(this.openOrderQueue.length > 0 && this.openOrderQueue[0].pickupPosition) {
    this.fleetVehicles.forEach((vehicle) => {
      if(!vehicle.isBusy && this.openOrderQueue[0]) {
        let pickUpTask = { type: 'PICKUP', deliveryTo: this.openOrderQueue[0].pickupPosition};
        let fullTask = this.openOrderQueue[0];
        vehicle.assignTask([ pickUpTask, fullTask]);
        return this.openOrderQueue.shift();
      }
    });
  }

  this.fleetVehicles.forEach((vehicle) => vehicle.update());
};

FleetManagementSystem.prototype.draw = function () {
  this.fleetVehicles.forEach((vehicle) => vehicle.draw())
}

FleetManagementSystem.prototype.addOrder = function (data) {
  this.openOrderQueue = this.openOrderQueue.concat([data]);
};
