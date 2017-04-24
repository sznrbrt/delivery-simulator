"use strict";

function Vehicle(_x, _y, resX, resY) {
  this.position = new Vector2(_x, _y);
  this.canvasPosition = new Vector2(_x * 40, _y * 40);
  this.restaurantPickupPosition = { x: resX, y: resY };
  this.speed = 2.5;
  this.tasks = [];
  this.completedTasks = [];
  this.followedPath = [];
}

Vehicle.prototype.update = function (delta) {
  // Check if there is a task - if so, check if route is available -> IF NOT GET SHORTEST PATH
  if(this.tasks.length > 0 && this.tasks[0].route.length === 0) {
    this.tasks[0].route = this.getShortestPath(this.tasks[0].start, this.tasks[0].end);
  }

  // Check if there is a task if so do, if not, go home
  if(this.tasks.length > 0) {

    // Movement for the task
  } else {
    // Check if home - if so, return
    if(this.canvasPosition.x * 40 === this.restaurantPickupPosition.x * 40 &&
       this.canvasPosition.y * 40 === this.restaurantPickupPosition.y * 40 ) {

      console.log('HOME');
      return;
    }
    // Movement for going home
    var path = this.followedPath.length === 0 ? this.getShortestPath(this.position, this.restaurantPickupPosition) : this.followedPath;

    this.followedPath.length === 0 ? this.followedPath = path : null;

    var targetX = path[0][0];
    var targetY = path[0][1];

    // If equals to current pos, node reached
    if(targetX * 40 === this.canvasPosition.x && targetY * 40 === this.canvasPosition.y) {
      if(this.followedPath.length === 1) return;
      this.followedPath.shift(); // If reached get next target
    } else {
      // Not equals
      // If X not equals move horizontally, else vertically
      if(targetX * 40 !== this.canvasPosition.x) {
        //Move horizontally
        if(targetX * 40 - this.canvasPosition.X > 0) this.canvasPosition.x -= this.speed;
        else this.canvasPosition.x += this.speed;
      } else if(targetY * 40 !== this.canvasPosition.y) {
        //Move vertically
        if(targetY * 40 - this.canvasPosition.y > 0) this.canvasPosition.y += this.speed;
        else this.canvasPosition.y -= this.speed;
      } else {
        console.log('WHERE?');
      }
    }
  }
};

Vehicle.prototype.draw = function () {
  // console.log(this.position);
  // console.log(this.canvasPosition);
  Canvas2D.canvasContext.fillStyle = "red";
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x + 15, this.canvasPosition.y + 15, 10, 10);
};

Vehicle.prototype.assignTask = function (data) {
  this.tasks.push(data);
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
