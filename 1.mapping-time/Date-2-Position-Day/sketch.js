let angle = 30;
let angle2 = 30;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  var now = clock();
  m = now.month;
  var r = 14;
  // d=now.day;


  //Background color setting
  background(67, 100, 235);
  noFill();
  stroke(255);
  strokeWeight(1);

  //6 rectangles
  push();
  translate(300, 300);
  rotate(angle);
  rectMode(CENTER);

  rect(0, 0, 500, 60);
  rotate(angle);
  rect(0, 0, 500, 60);
  rotate(angle);
  rect(0, 0, 500, 60);
  rotate(angle);
  rect(0, 0, 500, 60);
  rotate(angle);
  rect(0, 0, 500, 60);
  rotate(angle);
  rect(0, 0, 500, 60);
  pop();



  //12 circles outline
  push();
  translate(300, 300);
  ellipse(0, -220, 60);//Jan
  rotate(angle2);
  ellipse(0, -220, 60);//Feb
  rotate(angle2);
  ellipse(0, -220, 60);//Mar
  rotate(angle2);
  ellipse(0, -220, 60);//Apr
  rotate(angle2);
  ellipse(0, -220, 60);//May
  rotate(angle2);
  ellipse(0, -220, 60);//Jun
  rotate(angle2);
  ellipse(0, -220, 60);//Jul
  rotate(angle2);
  ellipse(0, -220, 60);//Aug
  rotate(angle2);
  ellipse(0, -220, 60);//Sep
  rotate(angle2);
  ellipse(0, -220, 60);//Oct
  rotate(angle2);
  ellipse(0, -220, 60);//Nov
  rotate(angle2);
  ellipse(0, -220, 60);//Dec
  pop();



  noStroke();

  if (m === 1) {
    push();
    translate(300, 300);
    fill(255, 229, 230);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 2) {
    push();
    translate(300, 300);
    rotate(30);
    fill(255, 204, 203);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 3) {
    push();
    translate(300, 300);
    rotate(60);
    fill(255, 178, 178);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 4) {
    push();
    translate(300, 300);
    rotate(90);
    fill(255, 154, 154);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 5) {
    push();
    translate(300, 300);
    rotate(120);
    fill(255, 127, 126);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 6) {
    push();
    translate(300, 300);
    rotate(150);
    fill(255, 102, 102);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 7) {
    push();
    translate(300, 300);
    rotate(180);
    fill(255, 78, 78);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 8) {
    push();
    translate(300, 300);
    rotate(210);
    fill(229, 25, 26);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 9) {
    push();
    translate(300, 300);
    rotate(240);
    fill(215, 38, 38);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 10) {
    push();
    translate(300, 300);
    rotate(270);
    fill(176, 1, 0);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 11) {
    push();
    translate(300, 300);
    rotate(300);
    fill(128, 0, 0);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  } else if (m === 12) {
    push();
    translate(300, 300);
    rotate(330);
    fill(78, 0, 0);
    d = now.day++;
    ellipse(0, -220, 60);
    ellipse(0, -220 + (r * d), 60);
    pop();
  
  };




  // //Jan
  // push();
  // translate(300, 300);
  // fill(255, 229, 230);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //July
  // push();
  // translate(300, 300);
  // rotate(180);
  // fill(255, 78, 78);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();


  // //Feb
  // push();
  // translate(300, 300);
  // rotate(30);
  // fill(255, 204, 203);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //Aug
  // push();
  // translate(300, 300);
  // rotate(210);
  // fill(229, 25, 26);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();


  // //March
  // push();
  // translate(300, 300);
  // rotate(60);
  // fill(255, 178, 178);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //Sep
  // push();
  // translate(300, 300);
  // rotate(240);
  // fill(215, 38, 38);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();


  // //April
  // push();
  // translate(300, 300);
  // rotate(90);
  // fill(255, 154, 154);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //Oct
  // push();
  // translate(300, 300);
  // rotate(270);
  // fill(176, 1, 0);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();


  // //May
  // push();
  // translate(300, 300);
  // rotate(120);
  // fill(255, 127, 126);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //Nov
  // push();
  // translate(300, 300);
  // rotate(300);
  // fill(128, 0, 0);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();


  // //Jun
  // push();
  // translate(300, 300);
  // rotate(150);
  // fill(255, 102, 102);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();
  // //Dec
  // push();
  // translate(300, 300);
  // rotate(330);
  // fill(78, 0, 0);
  // d = now.day++;
  // ellipse(0, -220 + (r * d), 60);
  // pop();












}