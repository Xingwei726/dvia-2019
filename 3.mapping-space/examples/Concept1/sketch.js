var table;
var mymap;
var graphicScale;
var longitude;
var latitude;
var magnitude;
var time;
// var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10])
// var moment = require('moment');
var markerIcon = L.icon({
    iconUrl: 'earthquake.png',
    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor:  [10, 10] // point from which the popup should open relative to the iconAnchor
});

var magnitudeInt=[];

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/1.0_day.csv", "csv", "header");

}


function setup(){
    
    //process earthquake data
    // print(table.getColumn('longitude'))
    longitude=table.getColumn("longitude")    
    latitude= table.getColumn("latitude")
    magnitude=table.getColumn("mag")
    time = table.getColumn("time")
    
    
    for (var m=0; m < magnitude.length; m++){
        var value = ceil(magnitude[m])
        magnitudeInt.push(value)
    }
    // console.log("longtitude",longitude)
    // console.log("latitude",latitude)
    // console.log("magnitude",magnitude)
    // console.log("magnitudeInt",magnitudeInt)

    
    let title = createElement('h2', 'Earthquakes And Measurement of Errors');
    title.position(30,400)

    //append an area for my diagram, later in draw function can use p5 do append shapes.
    var margin = {top: 10, right: 30, bottom: 30, left: 30};
    width = 1600;
    height = 800 - margin.top - margin.bottom;
    let myCanvas = createCanvas(width, height);//default screen width is 1440px;
    myCanvas.parent('myDiagram');
    //change the canvas's position
    myCanvas.position(0,400);
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
    zoom: 0
});
    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        minZoom: 2,
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

    
    
    
    for (var r=0; r<table.getRowCount(); r++){
        var row = table.getRow(r);
        var bounds= [[row.getNum('latitude'), row.getNum('longitude')],[row.getNum('latitude') + magnitudeInt[r], row.getNum('longitude') + magnitudeInt[r]]];
        var rect = L.rectangle( bounds, {color: "#ff7800", weight: 1} ).addTo(mymap);
        // var rect = L.rectangle( bounds, {color: magScale(magvalue).hex(),weight:1 }).addTo(mymap);
        // var customPopup = "Tooltip<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
        // day = time || moment().format('dddd')
        

        var customPopup = (time[r])
        var customOptions =
            {
            'maxWidth': '500',
            'className' : 'custom'
            }
        var customPopup2 = (latitude[r])
        var customOptions2 =
            {
            'maxWidth': '500',
            'className' : 'custom2'
            }        
        
            
        rect.bindPopup(customPopup2,customOptions2);
        L.marker([latitude[r],longitude[r]],{icon: markerIcon}).addTo(mymap).bindPopup(customPopup,customOptions).on('click', clickZoom);

            
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
  var top=80;
  angleMode(DEGREES);
  
  //legend label
    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30,top+20,30,30);

    fill(255);
    noStroke();
    textSize(12);
    text("Magnitude",30, top+10);
    
    push();
    translate(20, top+52);
    rotate(-90);
    text("Depth", 0, 0);
    pop();

  
  
  for (let l1 = 0; l1 < 50; l1++) {
    depth = table.getNum(l1, 3);// get earthquake's depth
    mag = table.getNum(l1, 4);// get earthquake's mag
    depError = table.getNum(l1,16);//get deperror
    // value4 = table.getNum(l1,17);//get magerror
    
    d = map(depth, -2, 607.78, 1, 20)//depth=>height
    w = map(mag,0.95,6.1, 1, 20 )//mag=>width
    de = map(depError, 0, 100, 1, 20)//deptherror
    // t3 = map(value4, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(60+30+25*l1,top+20,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(60+30+25*l1, top+80, 60+30+25*l1, top+80+de, 60+30+25*l1+de, top+80);
    pop();
  }
  
  
  
  
  for (let l1 = 51; l1 < 100; l1++) {
    value = table.getNum(l1, 3);// get earthquake's depth
    value2 = table.getNum(l1, 4);// get earthquake's mag
    value3 = table.getNum(l1,16);//get deperror
    // value4 = table.getNum(l1,17);//get magerror
    
    d = map(value, -2, 607.78, 1, 20)//depth=>height
    w = map(value2,0.95,6.1, 1, 20 )//mag=>width
    de = map(value3, 0, 100, 1, 20)//deptherror
    // t3 = map(value4, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-51),top*2+80,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-51), top*2+140, 30+25*(l1-51), top*2+140+de, 30+25*(l1-51)+de, top*2+140);
    pop();
  }
  
  for (let l1 = 101; l1 < 150; l1++) {
    value = table.getNum(l1, 3);// get earthquake's depth
    value2 = table.getNum(l1, 4);// get earthquake's mag
    value3 = table.getNum(l1,16);//get deperror
    // value4 = table.getNum(l1,17);//get magerror
    
    d = map(value, -2, 607.78, 1, 20)//depth=>height
    w = map(value2,0.95,6.1, 1, 20 )//mag=>width
    de = map(value3, 0, 100, 1, 20)//deptherror
    // t3 = map(value4, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-101),top*3+140,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-101), top*3+200, 30+25*(l1-101), top*3+200+de, 30+25*(l1-101)+de, top*3+200);
    pop();
  }
  
  for (let l1 = 151; l1 < 211; l1++) {
    value = table.getNum(l1, 3);// get earthquake's depth
    value2 = table.getNum(l1, 4);// get earthquake's mag
    value3 = table.getNum(l1,16);//get deperror
    // value4 = table.getNum(l1,17);//get magerror
    
    d = map(value, -2, 607.78, 1, 20)//depth=>height
    w = map(value2,0.95,6.1, 1, 20 )//mag=>width
    de = map(value3, 0, 100, 1, 20)//deptherror
    // t3 = map(value4, 0.006, 4.4, 1, 20)//magerror

    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(30+25*(l1-151),top*4+200,10*w,10*d);
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    triangle(30+25*(l1-151), top*4+260, 30+25*(l1-151), top*4+260+de, 30+25*(l1-151)+de, top*4+260);
    pop();
  }
  
    
};