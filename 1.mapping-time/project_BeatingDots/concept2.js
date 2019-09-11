function setup() { 
  createCanvas(800,400);
  rectMode(CENTER)
} 

function draw(){
  //Background color setting
  background(67,100,235);
  
  //Background dots
  fill(255,132,49)
  noStroke();
  var diameter =50
  for (var i=0; i<width/diameter; i++){
    for (var j=0; j<height/diameter; j++){
      ellipse(
        diameter/2 +i*diameter,
        diameter/2 +j*diameter,
        diameter*noise(second()+i+j),
        diameter*noise(second()+i+j),
      );
    }
  }
  
  //Background square
  fill(67,100,235)
  noStroke();
  rect(400,200,300,300)
  
  //Background circle for the clock
  fill(255);
  noStroke();
  ellipse(400,200,299,299);
  
  //Hour's cycle
  fill(255,132,49);
  arc(400,200,300,300,1.5*PI,(hour()/12*PI-HALF_PI+0.0001)); 
  //Minute's cycle
  fill(67,100,235);
  arc(400,200,300,300,1.5*PI,(minute()/30*PI-HALF_PI+0.0001));
  //Second's cycle  
  fill(0,0,0,50);
  arc(400,200,300,300,1.5*PI,(second()/30*PI-HALF_PI+0.0001));
  
}

