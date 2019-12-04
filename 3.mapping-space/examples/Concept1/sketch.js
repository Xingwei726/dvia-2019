var table;
var mymap;
var graphicScale;
var longitude;
var latitude;
var magnitude;
var time;
var depth;
var th;
var th2;
// var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10])
// var moment = require('moment');
var markerIcon = L.icon({
    iconUrl: 'earthquake.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [-100, 20] // point from which the popup should open relative to the iconAnchor
});




var magnitudeInt=[];
var depthInt=[]

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/1day.csv", "csv", "header");

}


function setup(){
    
    //process earthquake data
    // print(table.getColumn('longitude'))
    longitude=table.getColumn("longitude")    
    latitude= table.getColumn("latitude")
    magnitude=table.getColumn("mag")
    depth=table.getColumn("depth")
    time = table.getColumn("time")
    
    for (var m=0; m < magnitude.length; m++){
        var value = ceil(map(magnitude[m],0.95,6.1,1,20))
        magnitudeInt.push(value)
    }
    
    for (var n=0; n <depth.length; n++){
        // th = table.getNum(n, 3);// get earthquake's depth
        th2 = ceil(map(depth[n], -2, 607.78, 1, 20))//depth=>height
        depthInt.push(th2)
    }
    
    // console.log("longtitude",longitude)
    // console.log("latitude",latitude)
    // console.log("magnitude",magnitude)
    // console.log("magnitudeInt",magnitudeInt)

    
    let title = createElement('h2', 'Earthquakes And Measurement of Errors');
    title.position(30,450)
    
    let subTitle = createElement('h3', 'From Nov.21 to Nov.22');
    subTitle.position(30,450)

    //append an area for my diagram, later in draw function can use p5 do append shapes.
    var margin = {top: 10, right: 30, bottom: 30, left: 30};
    width = 1600;
    height = 800 - margin.top - margin.bottom;
    let myCanvas = createCanvas(width, height);//default screen width is 1440px;
    myCanvas.parent('myDiagram');
    //change the canvas's position
    myCanvas.position(0,450);
    //setup map
    setupMap();
    addRect();
  
}


function setupMap() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    // mymap = L.map('quake-map').setView([-73.9749,40.7736], 0);
    mymap = L.map('quake-map', {
    center: [-73.9749,40.7736],
    boxZoom: true,
    minZoom: 2,
    zoom: -10
});
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 12,
        // minZoom: 2,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiaHVhbng0MjkiLCJhIjoiY2szMzRzNHpqMGpiZDNib3EzbGgweHR0eSJ9.FbzMgwMQ7oL8uqZBSJqF2A'
    }).addTo(mymap);
       
      graphicScale = L.control.graphicScale(['fill']).addTo(mymap);

}




function clickZoom(e) {
    mymap.setView(e.target.getLatLng(),5);
}


function addRect(){

    //x
    var longitudeMin=columnMin(table,"longitude");
    var longitudeMax=columnMax(table,"longitude");
    console.log('longitude range:', [longitudeMin, longitudeMax]);

    //y
    var latitudeMin=columnMin(table,"latitude");
    var latitudeMax=columnMax(table,"latitude");
    console.log('latitude range:', [latitudeMin, latitudeMax]);
    
    console.log("longtitude",longitude)
    console.log("latitude",latitude)
    console.log("magnitude",magnitude)
    console.log("magnitudeInt",magnitudeInt)
    console.log("depthInt",depthInt)
    console.log("depth",depth)


    
    // var markers = L.markerClusterGroup();
    
    for (var r=0; r<table.getRowCount(); r++){
        var row = table.getRow(r);
        
        // console.log("th2",depthInt)
        var bounds= [[row.getNum('latitude'), row.getNum('longitude')],[row.getNum('latitude') + depthInt[r], row.getNum('longitude') +magnitudeInt[r]]];
        var rect = L.rectangle( bounds, {color: "#ff7800", weight: 1} ).addTo(mymap);
        // var rect = L.rectangle( bounds, {color: magScale(magvalue).hex(),weight:1 }).addTo(mymap);
        // var customPopup = "Tooltip<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
        // day = time || moment().format('dddd')
        
        // var customPopup = (time[r])
        const customPopup=
                "<h4>Timestamp:</h4>"+
                "<h4>"+time[r]+"</h4>" +
                // "<br/>" +
                "<h4>Longitude:</h4>"+
                "<h4>"+longitude[r]+"</h4>"+
                // "<br/>" +
                "<h4>Latitude:</h4>"+
                "<h4>"+latitude[r]+"</h4>";                
     
        
        var customOptions =
            {
            // 'maxWidth': '500px',
            'className' : 'custom'
            }
        
        // var customPopup2 = (latitude[r])
        const customPopup2 =
                "<h4>Magnitude:</h4>"+"<h4>"+ magnitude[r]+"</h4>" +
                // "<br/>" +
                "<h4>Depth:</h4>"+ "<h4>"+ depth[r] + "</h4>";
        
        
        
        var customOptions2 =
            {
            'maxWidth': '500px',
            'className' : 'custom2'
            }        
        

            
        rect.bindPopup(customPopup2,customOptions2);
        marker = L.marker([latitude[r],longitude[r]],{icon: markerIcon}).addTo(mymap).bindPopup(customPopup,customOptions).on('click', clickZoom);
        // markers.addLayer(marker)
            
        mymap.fitBounds(bounds);
        

    }
  
}



function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}



// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
}


// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 5,
//         color: '#666',
//         dashArray: '',
//         fillOpacity: 0.7
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
// }




//draw my diagram
function draw(){
  background("#ff7800");
  
  var top=100;
  var el=2;//enlarge
  angleMode(DEGREES);
  
  //legend label for earthquakes
    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30,top+20,30,30);

    fill(0);
    noStroke();
    textSize(12);
    textFont('PT Mono')
    text("Magnitude",30, top+10);
    
    push();
    fill(0)
    translate(20, top+52);
    rotate(-90);
    text("Depth", 0, 0);
    pop();
    
  //legend for errors
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30, top+80, 30, top+80+30, 30+20, top+80);
    pop();
    
    fill(255);
    noStroke();
    textSize(12);
    text("magError",30, top+70);
    
    push();
    fill(255)
    translate(20, top+140);
    rotate(-90);
    text("depthError", 0, 0);
    pop();

  
  
  for (let l1 = 0; l1 < 51; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    magError = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    me = map(magError, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(60+30+25*l1,top+20,10*w,10*d);
    
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(60+30+25*l1, top+80, 60+30+25*l1, top+80+de*el, 60+30+25*l1+me*el, top+80);
    pop();
  }
  
  
  
  
  for (let l1 = 51; l1 < 102; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    magError = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    me = map(magError, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-51),top*2+80,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-51), top*2+140, 30+25*(l1-51), top*2+140+de*el, 30+25*(l1-51)+me*el, top*2+140);
    pop();
  }
  
  for (let l1 = 102; l1 < 153; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    magError = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    me = map(magError, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-102),top*3+140,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-102), top*3+200, 30+25*(l1-102), top*3+200+de*el, 30+25*(l1-102)+me*el, top*3+200);
    pop();
  }
  
  for (let l1 = 153; l1 < 204; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    magError = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    me = map(magError, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-153),top*4+200,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-153), top*4+260, 30+25*(l1-153), top*4+260+de*el, 30+25*(l1-153)+me*el, top*4+260);
    pop();
  }
  
  for (let l1 = 204; l1 < 215; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    magError = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    me = map(magError, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-204),top*5+260,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-204), top*5+320, 30+25*(l1-204), top*5+320+de*el, 30+25*(l1-204)+me*el, top*5+320);
    pop();
  }
  
    
};