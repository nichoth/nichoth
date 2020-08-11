var Particles = require('canvas-particles');
var randColor = require('randomcolor');

var canvas = document.querySelector('canvas');
canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);

// falling particles with random x velocity and random origin
var range = 50;
var xMax = ((canvas.width / 2) + range+20);
var xMin = ((canvas.width/2) - range-20);
var yMax = ((canvas.height / 2) + range);
var yMin = ((canvas.height/2) - range);

var particles = Particles({
  maxParticles: 50,
  density: 0,
  gravity: 0.04,
  vx: 0,
  vy: 3,
  origin: function() {
    return {
      x: Math.random() * (xMax - xMin) + xMin,
      y: Math.random() * (yMax - yMin) + yMin
    };
  },
  color: randColor,
  wobble: function() {
    return Math.random() + 1 - 1.5;
  }
}).loop(canvas, redrawFn);

function redrawFn(ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canvas.width, canvas.height);
}
