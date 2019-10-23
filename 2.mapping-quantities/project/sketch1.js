var atmospheric;
var underground;
var mortality;


function preload(){
  mortality = loadTable('data/mortality.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')

}

// // function preload() {
// //   myFont = loadFont('assets/GrifoM-Black.otf');
// // }

// function setup(){
//   createCanvas(3200, 700)
//   background(0)

//   // pick one of the three data files to work with and call it 'data'
//   var data = atmospheric;
//   var palette = Brewer.divergent('RdBu', Infinity, -60, 0, 80)

//   // set up typography
//   // textFont("Rokkitt")
//   // textSize(16)
//   // fill(230)
//   // noStroke()
// }


let num =5

function setup() {
  createCanvas(6400, 800)
  background(100,145,141,57)
  ellipseMode(CENTER); 
}

function draw() {
  
  var table = atmospheric;
  var table2 = underground;
  var table3 = mortality;
  print(table);
  print(table2);
  print(table3);

  
//countries' Color Scheme  
  
  
  
  
// stave
  stroke(0);
  x1=100;
  y1=150;
  x2=6100;
  y2=150;
  d=50;
  d2=350;
  for (let i = 0; i < num; i++) {
    line (x1, y1+d*i, x2, y2+d*i);
    line (x1, y1+d*i+d2, x2, y2+d*i+d2);
  }

  stroke(0);
  push();  
  line (x1+15, y1, x1+15, y1+d*8+150)
  fill(0);
  rect (x1,y1,5,d*8+150)
  line (x2, y1, x2, y1+d*8+150)
  pop();
  
  
// y-axis 
  textFont("Helvetica")
  textSize(15);
  fill(0);
  noStroke();
  ts=5;//text size bleed
  
  text('Number of Nuclear Tests', x1-25, y1-25);
  text('60', x1-25, y1+ts);
  text('45', x1-25, y1+ts+d);
  text('30', x1-25, y1+ts+d*2);
  text('15', x1-25, y1+ts+d*3);
  text('0', x1-15, y1+ts+d*4); 
  
  
  text('Youth Mortality Rate (%)', x1-25, y1-25+d2);
  text('32', x1-25, y1+ts+d*4+150);
  text('24', x1-25, y1+ts+d*5+150);
  text('16', x1-25, y1+ts+d*6+150);
  text('8', x1-15, y1+ts+d*7+150);
  text('0', x1-15, y1+ts+d*8+150); 
  
//legend
  fill(0,41,134)
  text('USA', x2+50, y1+ts);
  ellipse(x2+35, y1, 15, 10);
  
  fill(218,41,28)
  text('Russia', x2+50, y1+ts+d);
  ellipse(x2+35, y1+d, 15, 10);
  
  fill(223, 133, 39)
  text('UK', x2+50, y1+ts+d*2);
  ellipse(x2+35, y1+d*2, 15, 10);
  
  fill(48, 154, 194)
  text('France', x2+50, y1+ts+d*3);
  ellipse(x2+35, y1+d*3, 15, 10);
  
  fill(245, 114, 168)
  text('China', x2+50, y1+ts+d*4);
  ellipse(x2+35, y1+d*4, 15, 10);
  
  
  
  
//x-axis
  textSize(12);
  fill(0);
  x = 150;
  y = 100;
  var rowHeight = 55;
  var colWidth = 80;
  textStyle(NORMAL);
  textAlign(BOLD);
  
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0);
    text(year, x+50, y+rowHeight*5);
    text(year, x+50, y+rowHeight*5+350);

    x += colWidth
  }


  
// x-axis reference line
  push();
  for (let i = 0; i < 73; i++) {
    stroke(172, 172, 172);
    drawingContext.setLineDash([1, 3]);
    // line (215, 150, 215, 350);
    line (215+80*i, 150, 215+80*i, 350);
    line (215+80*i, 150+d2, 215+80*i, 350+d2);
  }
  pop();
  


//Mapping data
  lw=2;
  
//China Atmospheric  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 5);
      var value2 = map(value, 0, 60, 100, 300)
      fill(245, 114, 168);
      ellipse(x, 450-value2, 15, 10);
      stroke(245, 114, 168);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }
  
//China Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 5);
      var value2 = map(value, 0, 60, 100, 300)
      fill(245, 114, 168);
      ellipse(x, 450-value2, 15, 10);
      stroke(245, 114, 168);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  }  


//US Atmospheric  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 1);
      var value2 = map(value, 0, 60, 100, 300)
      fill(0,41,134);
      ellipse(x, 450-value2, 15, 10);
      stroke(0,41,134);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }
  
//US Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 1);
      var value2 = map(value, 0, 60, 100, 300)
      fill(0,41,134);
      ellipse(x, 450-value2, 15, 10);
      stroke(0,41,134);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  }
  
  //US Mortality  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table3.getRowCount(); r++){
      var value = table3.getNum(r, 7);
      var value2 = map(value, 0, 32, 100, 300)
      fill(0,41,134);
      ellipse(x, 450-value2+350, 15, 10);
      // stroke(0,41,134);
      // push();
      // strokeWeight(lw);
      // line(x+7,450-value2,x+7,475-value2)
      // pop();
    x += colWidth2
  }



 //Russia Atmospheric  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 2);
      var value2 = map(value, 0, 60, 100, 300)
      fill(218,41,28);
      ellipse(x, 450-value2, 15, 10);
      stroke(218,41,28);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }
  
//Russia Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 2);
      var value2 = map(value, 0, 60, 100, 300)
      fill(218,41,28);
      ellipse(x, 450-value2, 15, 10);
      stroke(218,41,28);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  }
  
//Russia Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table3.getRowCount(); r++){
      var value = table3.getNum(r, 6);
      var value2 = map(value, 0, 32, 100, 300)
      fill(218,41,28);
      ellipse(x, 450-value2+350, 15, 10);
      // stroke(218,41,28);
      // push();
      // strokeWeight(lw);
      // line(x+7,450-value2,x+7,475-value2)
      // pop();
    x += colWidth2
  }
  
 //UK Atmospheric  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 3);
      var value2 = map(value, 0, 60, 100, 300)
      fill(223, 133, 39);
      ellipse(x, 450-value2, 15, 10);
      stroke(223, 133, 39);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }
  
//UK Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 3);
      var value2 = map(value, 0, 60, 100, 300)
      fill(223, 133, 39);
      ellipse(x, 450-value2, 15, 10);
      stroke(223, 133, 39);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  } 
  
  
  
//France Atmospheric  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 4);
      var value2 = map(value, 0, 60, 100, 300)
      fill(48, 154, 194);
      ellipse(x, 450-value2, 15, 10);
      stroke(48, 154, 194);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }
  
//France Underground  
  x = 215;
  x1=100;
  var colWidth2 = 80;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 4);
      var value2 = map(value, 0, 60, 100, 300)
      fill(48, 154, 194);
      ellipse(x, 450-value2, 15, 10);
      stroke(48, 154, 194);
      push();
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  }
 

 
 
 
  
  
  
  
  
  
}

