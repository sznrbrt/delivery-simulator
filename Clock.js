"use strict";

function Clock() {
}

Clock.prototype.draw = function (time) {
  // function minutesToHm(d) {
  //     d = Number(d);
  //
  //     var h = Math.floor(d / 60);
  //     // var m = Math.floor(d % 3600 / 60);
  //     var m = Math.floor(d % 3600 % 60);
  //
  //     return `00${h}`.slice(-2) + ":" + `00${m}`.slice(-2);
  // }
  //
  // var currentTime = minutesToHm(Math.round(this.time + time));

  document.getElementById('time').innerHTML = `T +${time}`;
};
