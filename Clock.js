"use strict";

function Clock() {
  this.time = 39600;
}

Clock.prototype.draw = function (time) {
  function minutesToHm(d) {
      d = Number(d);

      var h = Math.floor(d / 3600);
      var s = Math.floor(d % 3600 % 60);

      return `00${h}`.slice(-2) + ":" + `00${s}`.slice(-2);
  }

  var currentTime = minutesToHm(Math.round(this.time + time));

  document.getElementById('time').innerHTML = currentTime;
};
