function setup() {
  createCanvas(800, 300);
}

function draw (){
  
  
  background(133,151,189);
  noFill();
  stroke(0);
  strokeWeight(1);
    
  // push();
  // translate(50, 110);
 //  var x=50;
 //  while(x<=(width-50)){
 //  rect(x, 110, 80, 80);
 //  x+=103;   
 // }
  // pop();
  var x1=55;
  var y1=110;
  var x2=55;
  var y2=190;
  var offset=103;
  var now = clock();
  
  for (x=50; x<=width-50;x+=103) {
      rect(x, 110, 80, 80);
  }
  
  for (z=now.month;z<13;z++){
    for (i=0;i<7; i++) {
      line( x1+offset*i, y1, x2+offset*i, y2); 
    }
    x1+=6;
  }

  for (z=now.month;z<13;z++){
    for (i=0;i<7; i++) {
      line( x1+offset*i+5, y1, x2+offset*i+5, y2); 
    }
    x2+=6;
  }
  
  fill(0);
  
  var wd=now.weekday;
  var s=50;
  
if (wd === 1) {
    rect(50, 110 + s, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 2) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110 + s, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 3) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110 + s, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 4) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110 + s, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 5) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110 + s, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 6) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110 + s, 80, 30)
    rect(50 + offset * 6, 110, 80, 30)
  } else if (wd === 7) {
    rect(50, 110, 80, 30);
    rect(50 + offset, 110, 80, 30)
    rect(50 + offset * 2, 110, 80, 30)
    rect(50 + offset * 3, 110, 80, 30)
    rect(50 + offset * 4, 110, 80, 30)
    rect(50 + offset * 5, 110, 80, 30)
    rect(50 + offset * 6, 110 + s, 80, 30)

  }
    
  
}