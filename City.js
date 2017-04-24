"use strict";

function City() {
  this.map = cityMap;
}

City.prototype.update = function (delta) {
};

City.prototype.draw = function () {
  this.drawMap();
};

City.prototype.drawMap = function () {
  var position = { x: 0, y: 0};

  this.map.forEach(function (e, i, arr) {
    if(i > 0) {
      position.x += 40;
    }
    if(i > 0 && i % 25 === 0) {
      position.y += 40;
      position.x = 0;
    }

    if(e === 'G') {
      Canvas2D.canvasContext.fillStyle = "#84BF04";
      Canvas2D.canvasContext.fillRect(position.x, position.y, 40, 40);
    }
    if(e === 'H') {
      Canvas2D.canvasContext.fillStyle = "#84BF04";
      Canvas2D.canvasContext.fillRect(position.x, position.y, 40, 40);
      Canvas2D.drawImage(sprites.house1, { x: position.x - 10, y: position.y - 10 }, undefined, 1);
    }
    if(e === 'R') {
      Canvas2D.canvasContext.fillStyle = "grey";
      Canvas2D.canvasContext.fillRect(position.x, position.y, 40, 40);
    }
    if(e === 'P') {
      // Canvas2D.canvasContext.fillStyle = "red";
      // Canvas2D.canvasContext.fillRect(position.x, position.y, 40, 40);
    }
  });
};
