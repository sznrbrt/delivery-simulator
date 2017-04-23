"use strict";

// Helps to use the requestAnimationframe instead of the window.setTimeout() method
var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//Constructor for the Game_Singleton class
function Game_Singleton() {
    this._size = null;
    this._spritesStillLoading = 0;
    this.gameWorld = null;
}

// returns the size of the game field
Object.defineProperty(Game_Singleton.prototype, "size",
    {
        get: function () {
            return this._size;
        }
    });

// Creates the canvas on a specified HTML element with the specified dimensions, also loads the assets of the game
Game_Singleton.prototype.start = function (canvasName, x, y) {
    this._size = new Vector2(x, y);
    Canvas2D.initialize(canvasName);
    this.loadAssets();
    this.assetLoadingLoop();
};

// Returns and image for saving in a variable
Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this._spritesStillLoading += 1;
    image.onload = function () {
      Game._spritesStillLoading -= 1;
    };
    return image;
};

// Checks if there is any sprite remained for loading, if not it call Game.initalize()
Game_Singleton.prototype.assetLoadingLoop = function () {
    if(this._spritesStillLoading <= 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        requestAnimationFrame(Game.mainLoop);
    }
};


/** This is the Game Loop -
*        1. Handles the input
*        2. Updates the game world
*        3. Clears the canvas
*        4. Draws the game world
*        5. Resets the mouse
*        6. Repeat
*/
Game_Singleton.prototype.mainLoop = function (delta) {
    var delta = 1 / 60;
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    requestAnimationFrame(Game.mainLoop);
};

// Calls an instance of the Game_Singleton() class and stores in the Game variable
var Game = new Game_Singleton();
