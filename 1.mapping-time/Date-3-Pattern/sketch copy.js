function setup() {
  createCanvas(700, 360);
  background(0);
  noStroke();

  let gridSize = 65;
  var now = clock();
  m= now.month;

  for (let x = gridSize; x <= width - gridSize; x += gridSize) {
    for (let y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x, y, m*5, m*5);
    }
  }
}
