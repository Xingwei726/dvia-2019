function setup() {
  createCanvas(600, 400)
  noStroke()
  rectMode(CENTER)
  frameRate(60) 
}

function draw() {
  var now = clock();
  background(2,50,74)

  length = height*now.progress.sec
  if (length < 0) {
    length = height
  }
  
//Hour
fill(242, 147, 126)
rect(now.hours*25, 200, now.hours*4, 300);

//Minute  
  fill(136, 186, 191)
  rect(now.min*10, 200, now.min*2, 150);
  
//Second
  fill(192, 203, 183)
  rect(now.sec*10, 200, now.sec, length);
  
//Second block
  fill(250, 247, 252)
  rectMode(CENTER);
  translate(width/2 , height/2);
  translate(p5.Vector.fromAngle(now.sec, 100));
  rect(0, 0, 25, 25);

}