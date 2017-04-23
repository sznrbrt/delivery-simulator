"use strict";

// Constructor for the Canvas2D_Singleton class
function Canvas2D_Singleton() {
    console.log("Creating Canvas2D object");
    this.canvas = null;
    this.canvasContext = null;
}

// Initialize() creates canvas on the specified canvasName
Canvas2D_Singleton.prototype.initialize = function (canvasName) {
    this.canvas = document.getElementById(canvasName);

    if (this.canvas.getContext)
        this.canvasContext = this.canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
    }
};

// clear() clears the canvas in its full size
Canvas2D_Singleton.prototype.clear = function () {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

// drawImage() draws an image file on the specified paramteres, if those are not specified the method works with its default values
Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        sprite.width, sprite.height * scale);
    this.canvasContext.restore();
};

// Calls an instance of the Canvas2D_Singleton class described above
var Canvas2D = new Canvas2D_Singleton();
