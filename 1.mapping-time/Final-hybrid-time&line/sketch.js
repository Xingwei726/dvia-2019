let angle = 30;

function setup() {
  createCanvas(800, 300);
  angleMode(DEGREES);
}

function draw() {

  var now = clock();
  var offset = 103;
  var x1 = 50;
  var y1 = 110;
  var x2 = 50;
  var y2 = 194;
  var sw = 84; //pill-shape width
  var sh = 15+now.moon*20; //pill-shape height
  var rc = 30; // rounded corner

  background(now.hour*10+15, 151, 189);
  // background(133, 151, 189);
  noFill();
  stroke(0);
  strokeWeight(1);


  //Second
  push();
  strokeWeight(1);
  for (x = now.sec; x <= width; x +=60) {
  line(x*10, 0, 0, 300);
  };
  pop();


  //Minute
  push();
  strokeWeight(1 * now.min);
  line(800, -10, 800 - 13 * now.min, 310);
  pop();


  //Second Background Dots
  fill(0)
  // noStroke();
  var diameter = 40
  for (var i = 0; i < width / diameter; i += 9.8) {
    for (var j = 0; j < height / diameter; j+=7) {
      ellipse(
        diameter / 4 + i * diameter,
        diameter / 4 + j * diameter,
        diameter * noise(now.progress.sec + i + j),
        diameter * noise(now.progress.sec + i + j),
      );
    }
  }


  //Seven Days Square 
  for (x = 50; x <= width - 50; x += 103) {
    fill(now.hour*10+15, 151, 189);
    rect(x, 110, 84, 84);
  }

  //Month of the Year 
  for (z = now.month; z < 14; z++) {
    for (i = 0; i < 7; i++) {
      line(x1 + offset * i, y1, x2 + offset * i, y2);
    }
    x1 += 7;
  }

  for (z = now.month; z < 14; z++) {
    for (i = 0; i < 7; i++) {
      line(134 + offset * i, y1, x2 + offset * i + 84, y2);
    }
    x2 -= 7;
  }

  fill(0);

  //Day of the Week 
  var wd = now.weekday;
  var s = 54;

  if (wd === 1) {
    push();
    rectMode(CENTER);
    translate(92, 152)
    rotate(60);
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 1, 110, sw, sh)
    rect(50 + offset * 2, 110, sw, sh)
    rect(50 + offset * 3, 110, sw, sh)
    rect(50 + offset * 4, 110, sw, sh)
    rect(50 + offset * 5, 110, sw, sh)
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 2) {
    rect(50, 152, sw, sh,rc);
    push();
    rectMode(CENTER);
    translate(92 + offset * 1, 152);
    rotate(60);
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 2, 110, sw, sh)
    rect(50 + offset * 3, 110, sw, sh)
    rect(50 + offset * 4, 110, sw, sh)
    rect(50 + offset * 5, 110, sw, sh)
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 3) {
    rect(50, 152, sw, sh,rc);
    rect(50 + offset * 1, 152, sw, sh,rc)
    push();
    rectMode(CENTER);
    translate(92 + offset * 2, 152);
    rotate(60);
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 3, 110, sw, sh)
    rect(50 + offset * 4, 110, sw, sh)
    rect(50 + offset * 5, 110, sw, sh)
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 4) {
    rect(50, 152, sw, sh,rc);
    rect(50 + offset * 1, 152, sw, sh,rc)
    rect(50 + offset * 2, 152, sw, sh,rc)
    push();
    rectMode(CENTER);
    translate(92 + offset * 3, 152)
    rotate(60)
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 4, 110, sw, sh)
    rect(50 + offset * 5, 110, sw, sh)
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 5) {
    rect(50, 152, sw, sh,rc);
    rect(50 + offset * 1, 152, sw, sh,rc)
    rect(50 + offset * 2, 152, sw, sh,rc)
    rect(50 + offset * 3, 152, sw, sh,rc)
    push();
    rectMode(CENTER);
    translate(92 + offset * 4, 152)
    rotate(60)
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 5, 110, sw, sh)
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 6) {
    rect(50, 152, sw, sh,rc);
    rect(50 + offset * 1, 152, sw, sh,rc)
    rect(50 + offset * 2, 152, sw, sh,rc)
    rect(50 + offset * 3, 152, sw, sh,rc)
    rect(50 + offset * 4, 152, sw, sh,rc)
    push();
    rectMode(CENTER);
    translate(92 + offset * 5, 152);
    rotate(60)
    rect(0, 0, sw, sh,rc);
    pop();
    rect(50 + offset * 6, 110, sw, sh)
  } else if (wd === 7) {
    rect(50, 152, sw, sh,rc);
    rect(50 + offset * 1, 152, sw, sh,rc)
    rect(50 + offset * 2, 152, sw, sh,rc)
    rect(50 + offset * 3, 152, sw, sh,rc)
    rect(50 + offset * 4, 152, sw, sh,rc)
    rect(50 + offset * 5, 152, sw, sh,rc)
    push();
    rectMode(CENTER);
    translate(92 + offset * 6, 152)
    rotate(60)
    rect(0, 0, sw, sh,rc);
    pop();

  }


}