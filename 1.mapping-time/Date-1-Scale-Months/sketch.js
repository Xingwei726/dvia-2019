let x;
let y;

function setup() {
  createCanvas(600, 600);
}

function draw() {

  var now = clock();
  x = 0;
  y = 0;
  w = 600;
  noFill();
  stroke(255);
  strokeWeight(1);

  // Hue & Orientation ---> Seasons
  if (now.season === 1) {
    background(65, 99, 99);
  } else if (now.season === 2) {
    background(148, 61, 61);
  } else if (now.season === 3) {
    background(174, 98, 32);
  } else {
    background(52, 63, 130);
  };

  if (now.season === 1) {
    for (let i = 0; i < 13; i++) {
      rect(x, 0, w, w);
      w -= 49;
      x += 25;
    };
  } else if (now.season === 2) {
    for (let i = 0; i < 13; i++) {
      rect(x, y, w, w);
      w -= 49;
      x += 50;
      y += 25;
    };
  } else if (now.season === 3) {
    for (let i = 0; i < 13; i++) {
      rect(x, y, w, w);
      w -= 49;
      x += 25;
      y += 50;
    };
  } else {
    for (let i = 0; i < 13; i++) {
      rect(0, y, w, w);
      w -= 49;
      y += 25;
    };
  };


  // Sizes ---> Months
  var m = now.month;


  // if (now.season === 1) {
  //   for (let m = 0; m < 4; m++) {
  //     noFill();
  //     stroke(255);
  //     strokeWeight(8);
  //     rect(25 * m, 0, 600 - 49 * m, 600 - 49 * m);
  //     m=m+2
  //   }
  // } else if (now.season === 2) {
  //   for (let m = 4; m < 7; m++) {
  //     noFill();
  //     stroke(255);
  //     strokeWeight(8);
  //     rect(50*m, 25*m, 600 - 49 * m, 600 - 49 * m);
  //   }
  // } else if (now.season === 3) {
  //   for (let m = 7; m < 10; m++) {
  //     noFill();
  //     stroke(255);
  //     strokeWeight(8);
  //     rect(25 * m, 50 * m, 600 - 49 * m, 600 - 49 * m);
  //   }
  // } else if (now.season === 4) {
  //   for (let m = 10; m < 13; m++) {
  //     noFill();
  //     stroke(255);
  //     strokeWeight(8);
  //     rect(0, 25 * m, 600 - 49 * m, 600 - 49 * m);
  //   }
  // }




  if (now.season === 1) {
    for (let m = 1; m < 4; m++) {
      noFill();
      stroke(255);
      strokeWeight(6);
      rect(25 * m, 0, 600 - 49 * m, 600 - 49 * m);
    }
  } else if (now.season === 2) {
    for (let m = 4; m < 7; m++) {
      noFill();
      stroke(255);
      strokeWeight(6);
      rect(50*m, 25*m, 600 - 49 * m, 600 - 49 * m);
    }
  } else if (now.season === 3) {
    for (let m = 7; m < 10; m++) {
      noFill();
      stroke(255);
      strokeWeight(6);
      rect(25 * m, 50 * m, 600 - 49 * m, 600 - 49 * m);
    }
  } else if (now.season === 4) {
    for (let m = 10; m < 13; m++) {
      noFill();
      stroke(255);
      strokeWeight(6);
      rect(0, 25 * m, 600 - 49 * m, 600 - 49 * m);
    }
  }

  







}