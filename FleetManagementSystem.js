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
    let freeVehicles = this.fleetVehicles.filter((v) => !v.isBusy);

    let distances = freeVehicles.map((v) => {
      return this.getShortestPath(v.position, this.openOrderQueue[0].pickupPosition).length;
    });

    let value = Math.min.apply( Math, distances );
    
    let closesDistanceIndex = distances.indexOf(value);

    console.log(closesDistanceIndex);

    for(let i = 0; i < this.fleetVehicles.length; i++) {
      let vehicle = this.fleetVehicles[i];
      if(!vehicle.isBusy && this.openOrderQueue[0]) {
        let pickUpTask = { type: 'PICKUP', deliveryTo: this.openOrderQueue[0].pickupPosition};
        let fullTask = this.openOrderQueue[0];
        vehicle.assignTask([ pickUpTask, fullTask]);
        this.openOrderQueue.shift();
        break;
      }
    }
  }

  this.fleetVehicles.forEach((vehicle) => vehicle.update());
};

FleetManagementSystem.prototype.draw = function () {
  this.fleetVehicles.forEach((vehicle) => vehicle.draw())
}

FleetManagementSystem.prototype.addOrder = function (data) {
  this.openOrderQueue = this.openOrderQueue.concat([data]);
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
