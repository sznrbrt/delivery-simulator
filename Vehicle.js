"use strict";

function Vehicle(_x, _y, resX, resY) {
  this.position = { x: _x, y: _y};
  this.canvasPosition = new Vector2(_x * 40, _y * 40);
  this.restaurantPickupPosition = { x: resX, y: resY };
  this.speed = 0.05;
  this.tasks = [{ name: 'Go to restaurant', start: { x: _x, y: _y}, end: { x: resX, y: resY }, route: [] }];
}

Vehicle.prototype.update = function (delta) {
  if(this.tasks.length > 0 && this.tasks[0].route.length === 0) {
    this.tasks[0].route = this.getShortestPath(this.tasks[0].start, this.tasks[0].end);
  }
  if(this.tasks.length > 0 && this.tasks[0].route.length > 0) {
    // Start movement and update position;
    if(this.position.x === this.tasks[0].route[0][0] && this.position.y === this.tasks[0].route[0][1]) {
      this.tasks[0].route.shift();
    } else {
      if(this.position.x !== this.tasks[0].route[0][0]) {
        // Vertical movement
      }
      else if(this.position.y !== this.tasks[0].route[0][1]) {
        // Horizontal movement
        var targetY = this.tasks[0].route[0][1] * 40;
        this.canvasPosition.y += (targetY - this.canvasPosition.y) * this.speed;
      } else {
        console.log('ERROR VAN');
      }
    }
  }
};

Vehicle.prototype.draw = function () {
  Canvas2D.canvasContext.fillStyle = "red";
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x + 15, this.canvasPosition.y + 15, 10, 10);
};

Vehicle.prototype.getShortestPath = function (a, b) {
  var start = getMapIndex(a);
  var goal = getMapIndex(b);

  var finder = new PF.AStarFinder();
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
