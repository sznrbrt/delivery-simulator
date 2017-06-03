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
    let vehicles = this.fleetVehicles;

    let index = this.selectVehicle(this.fleetVehicles, this.openOrderQueue[0]);

    if(index !== undefined) {
      let vehicle = this.fleetVehicles[index];

      let pickUpTask = { type: 'PICKUP', deliveryTo: this.openOrderQueue[0].pickupPosition};
      let fullTask = this.openOrderQueue[0];

      vehicle.assignTask([ pickUpTask, fullTask]);
      this.openOrderQueue.shift();
    }
  }


  this.fleetVehicles.forEach((vehicle) => vehicle.update());

  let percentageOfIdleDrivers = this.fleetVehicles.filter((vehicle) => !vehicle.isBusy).length / this.fleetVehicles.length;
  Game.gameWorld.idleDriverPercentage = percentageOfIdleDrivers;
};

FleetManagementSystem.prototype.draw = function () {
  this.fleetVehicles.forEach((vehicle) => vehicle.draw())
}

FleetManagementSystem.prototype.addOrder = function (data) {
  this.openOrderQueue = this.openOrderQueue.concat([data]);
};

FleetManagementSystem.prototype.selectVehicle = function (vehicles, task) {
  let distances = vehicles.map((v) => {
    if(v.isBusy) return undefined;
    else return this.getShortestPath(v.position, task.pickupPosition).length;
  });

  var idx = 0;

  var value = distances[0];

  for(let i = 0; i < distances.length; i++) {
    if(!value || value > distances[i]) {
      value = distances[i];
      idx = i;
    }
  }

  return vehicles[idx].isBusy ? undefined : idx;
};

FleetManagementSystem.prototype.getShortestPath = function (a, b) {
  var start = getMapIndex(a);
  var goal = getMapIndex(b);

  var finder = new PF.BestFirstFinder({ allowDiagonal: false });
  var grid = cityGrid.clone();
  var path = finder.findPath(a.x, a.y, b.x, b.y, grid);

  return path;
};

function getMapIndex(coord) {
  var index = coord.x + ((coord.y * 25));
  return index;
  // idx1 = 0 * 0
  // idx2 = 1 * 0
  // idx3 = 2 * 0
  // idx25 = 0 * 1
}

Array.min = function( array ){
    return
};
