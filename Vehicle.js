"use strict";

function Vehicle(_x, _y, resX, resY, color) {
  this.color = color;
  this.position = new Vector2(_x, _y);
  this.canvasPosition = new Vector2(_x * 40, _y * 40);
  this.restaurantPickupPosition = { x: resX, y: resY };
  this.speed = 5;
  this.tasks = [];
  this.completedTasks = [];
  this.followedPath = [];
  this.simulatedTaskTime = 0;
  this.isBusy = false;
}

Vehicle.prototype.update = function (delta) {
  // If there is simulatedTaskTime then wait
  if(this.simulatedTaskTime > 0) {
    this.simulatedTaskTime -= 1;
    return;
  }

  // Check if there is a task - if so, check if route is available -> IF NOT GET SHORTEST PATH
  if(this.tasks.length > 0 && this.tasks[0] && this.tasks[0].route && this.tasks[0].route.length > 0) {
    this.tasks[0].route = this.getShortestPath(this.position, this.tasks[0].deliveryTo);
    this.followedPath = this.getShortestPath(this.position, this.tasks[0].deliveryTo);;
  }

  if(this.simulatedTaskTime === 0 && this.tasks.length === 0 &&
     this.position.x === this.restaurantPickupPosition.x &&
     this.position.y === this.restaurantPickupPosition.y) {
       Game.gameWorldBasic.idleTimeUnit += (1/60);
       this.isBusy = true;
  } else {
    this.isBusy = false;
  }

  // Check if there is a task if so do, if not, go home
  if(this.tasks.length > 0) {
    // Movement for the task
    // Check if reached destination - if so, return
    if(this.canvasPosition.x === this.tasks[0].deliveryTo.x * 40 &&
       this.canvasPosition.y === this.tasks[0].deliveryTo.y * 40 ) {
         this.completedTasks.push(this.tasks[0]);
         Game.gameWorldBasic.waitingTimes.push(Game.gameWorldBasic.time - this.tasks[0].startTime);
         Game.gameWorldBasic.waitingTimesForCurrentPeriod.push(Game.gameWorldBasic.time - this.tasks[0].startTime);
         Game.gameWorldBasic.completedOrders++;
         this.tasks.shift();
         this.simulatedTaskTime = 100;
      return;
    }

    var path = this.followedPath.length === 0 ? this.getShortestPath(this.position, this.tasks[0].deliveryTo).slice(1) : this.followedPath;

    if(path.length === 0) {
      // Avoid error if next deliveryTarget is the same
      this.completedTasks.push(this.tasks[0]);
      Game.gameWorldBasic.waitingTimes.push(Game.gameWorldBasic.time - this.tasks[0].startTime);
      Game.gameWorldBasic.waitingTimesForCurrentPeriod.push(Game.gameWorldBasic.time - this.tasks[0].startTime);
      Game.gameWorldBasic.completedOrders++;
      this.simulatedTaskTime = 50;
      this.tasks.shift();
      return;
    }

    var targetX = path[0][0];
    var targetY = path[0][1];

    // If equals to current pos, node reached
    if(targetX * 40 === this.canvasPosition.x && targetY * 40 === this.canvasPosition.y) {
      this.position = new Vector2(targetX, targetY);
      if(this.followedPath.length === 1) return;
      this.followedPath.shift(); // If reached get next target
      document.getElementById('distanceUnitMeterBasic').innerHTML = parseInt(document.getElementById('distanceUnitMeterBasic').innerHTML) + 1;
    } else {
      // Not equals
      // If X not equals move horizontally, else vertically
      if(targetX * 40 !== this.canvasPosition.x) {
        //Move horizontally
        if((targetX * 40 - this.canvasPosition.x) < 0) this.canvasPosition.x -= (this.speed * Game.gameWorldBasic.multiplier);
        else this.canvasPosition.x += this.speed;
      } else if(targetY * 40 !== this.canvasPosition.y) {
        //Move vertically
        if(targetY * 40 - this.canvasPosition.y > 0) this.canvasPosition.y += (this.speed * Game.gameWorldBasic.multiplier);
        else this.canvasPosition.y -= this.speed;
      } else {
        console.log('WHERE?');
      }
    }

  } else {
    // Check if home - if so, return
    if(this.canvasPosition.x === this.restaurantPickupPosition.x &&
       this.canvasPosition.y === this.restaurantPickupPosition.y ) {
         return;
    }
    // Movement for going home
    var path = this.followedPath.length === 0 ? this.getShortestPath(this.position, this.restaurantPickupPosition) : this.followedPath;
    this.followedPath.length === 0 ? this.followedPath = path : null;

    var targetX = path[0][0];
    var targetY = path[0][1];
    // If equals to current pos, node reached
    if(targetX * 40 === this.canvasPosition.x && targetY * 40 === this.canvasPosition.y) {
      this.position = new Vector2(targetX, targetY);
      if(this.followedPath.length === 1) return this.followedPath = [];
      this.followedPath.shift(); // If reached get next target
      // document.getElementById('distanceUnitMeterBasic').innerHTML = parseInt(document.getElementById('distanceUnitMeterBasic').innerHTML) + 1;
    } else {
      // Not equals
      // If X not equals move horizontally, else vertically
      if(targetX * 40 !== this.canvasPosition.x) {
        //Move horizontally
        if(targetX * 40 - this.canvasPosition.x > 0) this.canvasPosition.x += this.speed;
        else this.canvasPosition.x -= this.speed;
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
  Canvas2D.canvasContext.fillStyle = this.color;
  Canvas2D.canvasContext.beginPath();
  Canvas2D.canvasContext.arc(this.canvasPosition.x + 20, this.canvasPosition.y + 20, 10, 0,2*Math.PI);
  Canvas2D.canvasContext.strokeStyle = this.color;
  Canvas2D.canvasContext.fillStyle = this.color;
  Canvas2D.canvasContext.stroke();
  Canvas2D.canvasContext.fill();
  //Canvas2D.canvasContext.fillRect(this.canvasPosition.x + 10, this.canvasPosition.y + 10, 20, 20);
  Canvas2D.canvasContext.font="14px Georgia";
  Canvas2D.canvasContext.fillStyle="white";
  Canvas2D.canvasContext.fillText(this.tasks.length, this.canvasPosition.x + 15.5, this.canvasPosition.y + 24);
};

Vehicle.prototype.assignTask = function (data) {
  this.tasks.push(data);
};

Vehicle.prototype.getShortestPath = function (a, b) {
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
}
