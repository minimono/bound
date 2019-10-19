let WIDTH;
let HEIGHT;
let canvas;
let ctx;
let balls = [];
const COLORS = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF'
]

function init(){
  'use strict';
  WIDTH = $(window).width();
  HEIGHT = $(window).height();
  canvas = $('canvas')[0];
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');
  $('canvas').on('click', function(e){
    for(let i = 0; i < 3; i++){
      let obj = new Map([
        ['x', e.clientX],
        ['y', e.clientY],
        ['v', Math.floor(Math.random()*14+1)],
        ['r', Math.floor(Math.random()*10+5)],
        ['angle', Math.random()*2*Math.PI],
        ['color', COLORS[Math.floor(Math.random()*COLORS.length)]]
      ]);
      balls.push(obj);
    }
  });
}

function loop(){
  'use strict';
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  balls.forEach(function(ball){
    if(ball.get('x') < ball.get('r')){
      ball.set('x', ball.get('r'));
      ball.set('angle', -ball.get('angle')+Math.PI);
    }else if(ball.get('x') > WIDTH - ball.get('r')){
      ball.set('x', WIDTH - ball.get('r'));
      ball.set('angle', -ball.get('angle')+Math.PI);
    }
    if(ball.get('y') < ball.get('r')){
      ball.set('y', ball.get('r'));
      ball.set('angle', -ball.get('angle'));
    }else if(ball.get('y') > HEIGHT - ball.get('r')){
      ball.set('y', HEIGHT - ball.get('r'));
      ball.set('angle', -ball.get('angle'));
    }
    ball.set('x', ball.get('x')+ball.get('v')*Math.cos(ball.get('angle')));
    ball.set('y', ball.get('y')+ball.get('v')*Math.sin(ball.get('angle')));
    ctx.beginPath();
    ctx.arc(ball.get('x'), ball.get('y'), ball.get('r'), 0, 2*Math.PI);
    ctx.fillStyle = ball.get('color');
    ctx.fill();
  });
}

$(function(){
  init();
  setInterval(loop, 16);
});