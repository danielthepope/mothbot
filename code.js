var SERVO = [B10, B13];
var LEFTLS = A5;
var RIGHTLS = A6;

var pos = [0.5,0.5];
setInterval(function() {
  //console.log(pos);
  for (var i in SERVO) {
    digitalPulse(SERVO[i], 1, 1+pos[i]);
  }
}, 20);

var go = false;
setInterval(function() {
  var vleft = analogRead(LEFTLS);
  var vright = analogRead(RIGHTLS);
  console.log(vleft + '           ' + vright);
  if (go) {
    // Read the two light sensors
    // Dark = ~1, Light ~0.3
    // If abs difference between them is > 0.2 move towards the lowest value
    
      // Pick the direction
      if (vleft < 0.1) {
        // Lighter on the left
        console.log('Left');
        left();
      } else if (vright < 0.1) {
        // Lighter on the right
        console.log('right');
        right();
      } else {
        console.log('forward');
        forward();
      }
    // else forward
  }
}, 300);

// Input between -1 and 1
function move(servoNumber, speed) {
  pos[servoNumber] = (speed/2.0)+0.5;
}

function stop() {
  for (var i in pos) {
    move(i,0);
  }
}

var speed = 1;
function forward() {
  move(0,-speed);
  move(1,speed);
}

function right() {
  move(0,-0.26*speed);
  //move(0,0);
  move(1,speed);
}

function left() {
  move(0,-speed);
  move(1,0.1*speed);
  //move(1,0);
}

var funs = [forward, right, left, stop];
var index = 0;
setWatch(function(e){
//  if (index > funs.length) index = 0;
//  funs[index++]();
  go = !go;
  if (!go) {
    console.log('stop');
    stop();
  }
}, BTN, {repeat:true, edge:"rising", debounce:50});

// var speed = 0;
// setWatch(function(e){
//   speed = speed < 0.5 ? 1 : 0;
//   digitalWrite(LED1,speed);
// }, BTN, {repeat:true, edge:"rising", debounce:50});

digitalWrite(LED2,1);
