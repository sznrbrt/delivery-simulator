"use strict";

function Clock() {
  this.time = 39600;
}

Clock.prototype.draw = function (time) {
  function secondsToHms(d) {
      d = Number(d);

      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      return `00${h}`.slice(-2) + ":" + `00${m}`.slice(-2) + ":" + `00${s}`.slice(-2);
  }

  var currentTime = secondsToHms(Math.round(this.time + time));

  document.getElementById('time').innerHTML = currentTime;
};
