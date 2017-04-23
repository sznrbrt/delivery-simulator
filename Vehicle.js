"use strict";

function Vehicle(_x, _y) {
  this.position = { x: _x, y: _y};
  this.canvasPosition = new Vector2(_x * 40, _y * 40);
  this.speed = 0;
}

Vehicle.prototype.update = function (delta) {
};

Vehicle.prototype.draw = function () {
  Canvas2D.canvasContext.fillStyle = "red";
  Canvas2D.canvasContext.fillRect(this.canvasPosition.x + 15, this.canvasPosition.y + 15, 10, 10);
};
