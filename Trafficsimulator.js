"use strict";

var sprites = {};
// Loads all of the gameassets()
Game.loadAssets = function () {
    // local loadSprite function, which expands the Game.loadSprite method by determining the folder of the sprites
    function loadSprite(sprite) {
        return Game.loadSprite("sprites/" + sprite);
    };
    // Game sprites
    sprites.house1 = loadSprite("buildinglarge.png");
};

// Initalizes the game by setting the
Game.initialize = function () {
    Game.gameWorld = new SimulatorGameWorld();
};
