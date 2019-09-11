let x; 
let y;
let num = 60;

function setup() {
createCanvas(600, 800);
  
}

function draw() {
background(0);



///second
stroke(255,163,0);
noFill();
strokeWeight(2);
fill(237,34,93)
let sec = map(second()*10,0,60,0,60)
line(sec, 0, sec, 200);



//minute
stroke(255,163,0);
strokeWeight(4);
let min = map(200+ minute()*10,0,60,0,60);
line(400, min, 600, min);


// Draw white bars
fill(255);
stroke(0);
y = 200;
for (let i = 0; i < num / 1; i++) {
  rect(400, y, 20, 6);
  y += 20;
}
// let a = minute();
// noStroke();
// for (var i=a; i<600; i+=10){
//   line(400,200+i, 600,200+i)
// }


// stroke(0);
// fill(255);
// for (var i=0; i<min; i++){
//   rect(400,200+min*10,200,6);
// };


//hour
  stroke(255,163,0);
  strokeWeight(6);
  let hr = map(200+hour()*10,0,60,0,60)
  // let x = 400-(6+16*hr)
  line(hr, 600, hr, 800);
}