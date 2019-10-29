var atmospheric;
var underground;
var mortality;


function preload(){
  mortality = loadTable('data/mortality.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')

}


let num =5

function setup() {
  createCanvas(4300, 1800)
  // background(100,145,141,57)
  background(255);
  ellipseMode(CENTER); 
  
// Put everything in setup instead of seperate between setup and draw
// }
// function draw() {
  
  var table = atmospheric;
  var table2 = underground;
  var table3 = mortality;
  print(table);
  print(table2);
  print(table3);
  
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
  
  
  
// y-axis labels
  textFont("Helvetica")
  textSize(18);
  noStroke();
  textStyle(BOLD);
  text('Number of Nuclear Tests', x1-20, y1-30);
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
    text(year, x+xs, y1+d*5);
    text(year, x+xs, y1+d*5+(d*4+d3)*2);
    text(year, x+xs, y1+d*5+(d*4+d3)*4);
    text(year, x+xs, y1+d*5+(d*4+d3)*6);

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
  text('USA', x1+17, y1-8);

//   fill(218,41,28)
//   text('Russia', x2+50, y1+ts+d);
//   ellipse(x2+35, y1+d, 15, 10);
  
//   fill(223, 133, 39)
//   text('UK', x2+50, y1+ts+d*2);
//   ellipse(x2+35, y1+d*2, 15, 10);
  
//   fill(48, 154, 194)
//   text('France', x2+50, y1+ts+d*3);
//   ellipse(x2+35, y1+d*3, 15, 10);
  
//   fill(245, 114, 168)
//   text('China', x2+50, y1+ts+d*4);
//   ellipse(x2+35, y1+d*4, 15, 10);
  
  
  
  


  

  


//Mapping data
  lw=2;
  
//US Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 1);
      var value2 = map(value, 0, 60, y2+d*2, 300)
      // fill(0,41,134);
      fill(pal.colorForValue(value))
      ellipse(x, 450-value2, 15, 10);
      push();
      stroke(pal.colorForValue(value));
      strokeWeight(lw);
      line(x+7,450-value2,x+7,425-value2)
      pop();
    x += colWidth2
  }

//US Underground  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 1);
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(pal.colorForValue(value));
      ellipse(x, 450-value2, 15, 10);
      push();
      stroke(pal.colorForValue(value));
      strokeWeight(lw);
      line(x+7,450-value2,x+7,475-value2)
      pop();
    x += colWidth2
  }
 
 //Russia Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 2);
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2, 15, 10);
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+7,450-value2+d2,x+7,425-value2+d2)
      pop();
    x += colWidth2
  } 
  
  //Russia Underground  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table2.getRowCount(); r++){
      var value = table2.getNum(r, 2);
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0);
      ellipse(x, 450-value2+d2, 15, 10);
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+7,450-value2+d2,x+7,475-value2+d2)
      pop();
    x += colWidth2
  }

 //UK Atmospheric  
  x=200;
  x1=100;
  var colWidth2 = 50;
  for (var r=0; r<table.getRowCount(); r++){
      var value = table.getNum(r, 3);
      var value2 = map(value, 0, 60, y2+d*2, 300)
      fill(0)
      ellipse(x, 450-value2+d2*2, 15, 10);
      push();
      stroke(0);
      strokeWeight(lw);
      line(x+7,450-value2+d2*2,x+7,425-value2+d2*2)
      pop();
    x += colWidth2
  } 

  


  

  
// //China Atmospheric  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table.getRowCount(); r++){
//       var value = table.getNum(r, 5);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(245, 114, 168);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(245, 114, 168);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,425-value2)
//       pop();
//     x += colWidth2
//   }
  
// //China Underground  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table2.getRowCount(); r++){
//       var value = table2.getNum(r, 5);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(245, 114, 168);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(245, 114, 168);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,475-value2)
//       pop();
//     x += colWidth2
//   }  

    // var pal = Brewer.sequential('Reds', 9, 0, 200) 
    // for (var i=0; i<200; i++){
    //     noStroke()
    //     fill(pal.colorForValue(i))
    //     rect(0,i, width/2,i+1)
    // }




  
//   //US Mortality  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table3.getRowCount(); r++){
//       var value = table3.getNum(r, 7);
//       var value2 = map(value, 0, 32, 100, 300)
//       fill(0,41,134);
//       ellipse(x, 450-value2+350, 15, 10);
//       // stroke(0,41,134);
//       // push();
//       // strokeWeight(lw);
//       // line(x+7,450-value2,x+7,475-value2)
//       // pop();
//     x += colWidth2
//   }






  

  
// //Russia Mortality  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table3.getRowCount(); r++){
//       var value = table3.getNum(r, 6);
//       var value2 = map(value, 0, 32, 100, 300)
//       fill(218,41,28);
//       ellipse(x, 450-value2+350, 15, 10);
//       // stroke(218,41,28);
//       // push();
//       // strokeWeight(lw);
//       // line(x+7,450-value2,x+7,475-value2)
//       // pop();
//     x += colWidth2
//   }
  
  
// //UK Atmospheric  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table.getRowCount(); r++){
//       var value = table.getNum(r, 3);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(223, 133, 39);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(223, 133, 39);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,425-value2)
//       pop();
//     x += colWidth2
//   }
  
// //UK Underground  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table2.getRowCount(); r++){
//       var value = table2.getNum(r, 3);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(223, 133, 39);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(223, 133, 39);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,475-value2)
//       pop();
//     x += colWidth2
//   } 
  
  
  
// //France Atmospheric  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table.getRowCount(); r++){
//       var value = table.getNum(r, 4);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(48, 154, 194);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(48, 154, 194);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,425-value2)
//       pop();
//     x += colWidth2
//   }
  
// //France Underground  
//   x = 215;
//   x1=100;
//   var colWidth2 = 80;
//   for (var r=0; r<table2.getRowCount(); r++){
//       var value = table2.getNum(r, 4);
//       var value2 = map(value, 0, 60, 100, 300)
//       fill(48, 154, 194);
//       ellipse(x, 450-value2, 15, 10);
//       stroke(48, 154, 194);
//       push();
//       strokeWeight(lw);
//       line(x+7,450-value2,x+7,475-value2)
//       pop();
//     x += colWidth2
//   }
 

 
 
 
  
  
  
  
  
  
}

