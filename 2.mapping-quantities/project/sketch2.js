var atmospheric;
var underground;
var mortality
var milestone;



function preload(){
  mortality = loadTable('data/mortality.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')
  milestone = loadTable('data/milestone.csv', 'csv', 'header')

}


let num =5

function setup() {
  createCanvas(4200, 1800)
  // background(100,145,141,57)
  background(255);
  ellipseMode(CENTER); 
  
// Put everything in setup instead of seperate between setup and draw
// }
// function draw() {
  
  var table = atmospheric;
  var table2 = underground;
  var table3 = mortality;
  var table4 = milestone;

  print(table);
  print(table2);
  print(table3);
  print(table4);

  
// Color Palette
  var pal = Brewer.sequential('Greys', 6, 0, 60);

  

// stave
  stroke(0);//stroke color
  x1=100;
  y1=150;
  x2=3850;
  y2=150;
  d=25;//distance between each line
  d2=200;//distance between first line and next first line of the stave
  d3=100;//distance between each stave
  for (let i = 0; i < num; i++) {
    line (x1, y1+d*i, x2, y2+d*i);
    line (x1, y1+d*i+d2, x2, y2+d*i+d2);
    line (x1, y1+d*i+d2*2, x2, y2+d*i+d2*2);
    line (x1, y1+d*i+d2*3, x2, y2+d*i+d2*3);
    line (x1, y1+d*i+d2*4, x2, y2+d*i+d2*4);
    line (x1, y1+d*i+d2*5, x2, y2+d*i+d2*5);
    line (x1, y1+d*i+d2*6, x2, y2+d*i+d2*6);
    line (x1, y1+d*i+d2*7, x2, y2+d*i+d2*7);

  }
  
// stave vertical lines
  stroke(0);
  push();  
  fill(0);
  rect (x1,y1,5,d*32+d3*7)//very left bar
  line (x1+15, y1, x1+15, y1+d*32+d3*7) //left vertical line
  line (x2, y1, x2, y1+d*32+d3*7)// right vertical line
  pop();
  
  
// Title
  textFont("Helvetica")
  textSize(30);
  noStroke();
  textStyle(BOLD);
  text('< Symphony >', x1-20, y1-70);
  // textStyle(ITALIC);
  // textSize(16);
  // text('from The Nuclear Tests', x1+200, y1-80);  

  
  
  
// y-axis labels
  textFont("Helvetica")
  textSize(16);
  noStroke();
  textStyle(BOLD);
  text('Number of Nuclear Tests', x1-20, y1-15);

  textFont("Helvetica")
  textSize(12);
  fill(0);
  noStroke();
  ts=5;//text size bleed
    for (let i = 0; i < 8; i++) {
  text('60', x1-20, y1+ts+d2*i);
  text('45', x1-20, y1+ts+d+d2*i);
  text('30', x1-20, y1+ts+d*2+d2*i);
  text('15', x1-20, y1+ts+d*3+d2*i);
  text('0', x1-15, y1+ts+d*4+d2*i); 
}


//x-axis labels & Vertical Reference Line
  textSize(12);
  fill(0);
  noStroke();
  x = 150;
  y = 100;
  xs =38;
  var rowHeight = 55;
  var colWidth = 50;
  textStyle(NORMAL);
  textAlign(BOLD);
  
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0);
    text(year, x+xs, y1+d*5);//+30 to put in middle
    // text(year, x+xs, y1+d*5+(d*4+d3)*1);
    text(year, x+xs, y1+d*5+(d*4+d3)*2);
    // text(year, x+xs, y1+d*5+(d*4+d3)*3);
    text(year, x+xs, y1+d*5+(d*4+d3)*4);
    // text(year, x+xs, y1+d*5+(d*4+d3)*5);
    text(year, x+xs, y1+d*5+(d*4+d3)*6);
    // text(year, x+xs, y1+d*5+(d*4+d3)*7);

    // line (x+50, y1, x+50,d*36+d3*7); //one line approach
    for (let i=0; i<8;i++){
    push();
    stroke(172, 172, 172);
    drawingContext.setLineDash([1, 3]);
    line (x+50, y1+d2*i, x+50,y1+d*4+d2*i);
    pop();
    }
    
    x += colWidth
  }


  
  
//legend
  fill(0);
  textFont("Helvetica")
  textSize(14);
  noStroke();
  textStyle(BOLD);
  textAlign(BOLD);
  text('USA', x1+17, y1+15);
  text('Russia', x1+17, y1-8+d2);
  text('United Kingdom', x1+17, y1-8+d2*2);
  text('France', x1+17, y1-8+d2*3);
  text('China', x1+17, y1-8+d2*4);
  text('India', x1+17, y1-8+d2*5);
  text('Pakistan', x1+17, y1-8+d2*6);
  text('North Korea', x1+17, y1-8+d2*7);


  


//Mapping data
  lw=2;
  
//1.US Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 1);//1
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2, 13, 8);
      push();
      // stroke(pal.colorForValue(value));
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2,x+6,428-value2)
      pop();
    x += colWidth2
  }

//1.US Underground  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 1);//1
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2, 13, 8);
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2,x+6,472-value2)
      pop();
    x += colWidth2
  }
  
//1.US Milestone
ls=10;//distance between two lines
push();
stroke(255,0,0);
strokeWeight(3);
line (200,0+y1,5+200,10+y1);
line (200-5,10+y1,200,0+y1);

line (200,0+y1+ls,5+200,10+y1+ls);
line (200-5,10+y1+ls,200,0+y1+ls);

line (200,0+y1+ls*2,5+200,10+y1+ls*2);
line (200-5,10+y1+ls*2,200,0+y1+ls*2);

line (200+50*7,0+y1,5+200+50*7,10+y1);
line (200-5+50*7,10+y1,200+50*7,0+y1);

line (200+50*7,0+y1+ls,5+200+50*7,10+y1+ls);
line (200-5+50*7,10+y1+ls,200+50*7,0+y1+ls);

line (200+50*9,0+y1,5+200+50*9,10+y1);
line (200-5+50*9,10+y1,200+50*9,0+y1);
pop();

 
 //2.Russia Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 2);//2
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2, 13, 8);//d2*1
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2,x+6,428-value2+d2)//d2*1
      pop();
    x += colWidth2
  } 
  
  //2.Russia Underground  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 2);//2
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2, 13, 8);//d2*1
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2,x+6,472-value2+d2)//d2*1
      pop();
    x += colWidth2
  }

//2.Russia Milestone
ls=10;//distance between two lines
push();
stroke(255,0,0);
strokeWeight(3);
//1949
line (200+50*4,0+y1+d2,5+200+50*4,10+y1+d2);
line (200-5+50*4,10+y1+d2,200+50*4,0+y1+d2);
//1953
line (200+50*8,0+y1+d2,5+200+50*8,10+y1+d2);
line (200-5+50*8,10+y1+d2,200+50*8,0+y1+d2);
//1955
line (200+50*10,0+y1+d2,5+200+50*10,10+y1+d2);
line (200-5+50*10,10+y1+d2,200+50*10,0+y1+d2);
//1961
line (200+50*16,0+y1+d2,5+200+50*16,10+y1+d2);
line (200-5+50*16,10+y1+d2,200+50*16,0+y1+d2);
pop();



 //3.UK Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 3);//3
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*2, 13, 8);//d2*2
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*2,x+6,428-value2+d2*2)//d2*2
      pop();
    x += colWidth2
  } 

  //3.UK Underground  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 3);//3
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*2, 13, 8);//d2*2
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*2,x+6,472-value2+d2*2)//d2*2
      pop();
    x += colWidth2
  }  


  //4.France 
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 4);//4
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*3, 13, 8);//d2*3
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*3,x+6,428-value2+d2*3)//d2*3
      pop();
    x += colWidth2
  } 

  //4.France 
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 4);//4
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*3, 13, 8);//d2*3
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*3,x+6,472-value2+d2*3)//d2*3
      pop();
    x += colWidth2
  } 

  //5.China
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 5);//5
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*4, 13, 8);//d2*4
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*4,x+6,428-value2+d2*4)//d2*4
      pop();
    x += colWidth2
  } 

  //5.China
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 5);//5
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*4, 13, 8);//d2*4
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*4,x+6,472-value2+d2*4)//d2*4
      pop();
    x += colWidth2
  } 

  //6.India
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 6);//6
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*5, 13, 8);//d2*5
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*5,x+6,428-value2+d2*5)//d2*5
      pop();
    x += colWidth2
  } 

  //6.India
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 6);//6
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*5, 13, 8);//d2*5
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*5,x+6,472-value2+d2*5)//d2*5
      pop();
    x += colWidth2
  } 

  //7.Pakistan
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 7);//7
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*6, 13, 8);//d2*6
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*6,x+6,428-value2+d2*6)//d2*6
      pop();
    x += colWidth2
  } 

  //7.Pakistan
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 7);//7
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*6, 13, 8);//d2*6
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*6,x+6,472-value2+d2*6)//d2*6
      pop();
    x += colWidth2
  } 
  
  //8.North Korea
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 8);//8
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*7, 13, 8);//d2*7
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*7,x+6,428-value2+d2*7)//d2*7
      pop();
    x += colWidth2
  } 

  //8.North Korea
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 8);//8
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2*7, 13, 8);//d2*6
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+6,451-value2+d2*7,x+6,472-value2+d2*7)//d2*7
      pop();
    x += colWidth2
  } 

  

  
  


 
 
 
  
  
  
  
  
  
}

