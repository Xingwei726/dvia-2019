var table;
var mymap;
var graphicScale;
var longitude;
var latitude;
var magnitude;
var magnitudeInt=[];
var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10])

var svg = d3.select("#myDiagram")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top*3 + margin.bottom*3)
            .attr("width", 1440)
            .attr("height", 800)
            .append("g")



function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/1.0_day.csv", "csv", "header");

    //process earthquake data    
    longitude= table.getColumn("longitude")
    latitude= table.getColumn("latitude")
    magnitude=table.getColumn("mag")
    for (var m=0; m < magnitude.length; m++){
        var value = ceil(magnitude[m])
        magnitudeInt.push(value)
    }
    // console.log("table:",table)
    // console.log("longtitude",longitude)
    // console.log("latitude",latitude)
    // console.log("magnitude",magnitude)
    console.log("magnitudeInt",magnitudeInt)


}


function setup(){
    
    let h1 = createElement('h1', 'Title of my graph.');
    h1.position(400,400)

    //append an area for my diagram, later in draw function can use p5 do append shapes.
    var margin = {top: 10, right: 30, bottom: 30, left: 30};
    width = 1440;
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
    mymap = L.map('quake-map').setView([-73.9749,40.7736], 0);
    
    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        minZoom: 2,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
       
       graphicScale = L.control.graphicScale(['fill']).addTo(mymap);

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
    
    for (var r=0; r<table.getRowCount(); r++){
        var row = table.getRow(r);
        var magvalue= table.getNum(r,4);
 
        var bounds= [[row.getNum('latitude'), row.getNum('longitude')],[row.getNum('latitude')+ceil(row.getNum('mag'))*0.5, row.getNum('longitude')+ceil(row.getNum('mag'))*0.5]];
        // var rect = L.rectangle( bounds, {color: "#ff7800", weight: 1} ).addTo(mymap);
        var rect = L.rectangle( bounds, {color: magScale(magvalue).hex(),weight:1 }).addTo(mymap);
        var customPopup = "Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
        var customOptions =
            {
            'maxWidth': '500',
            'className' : 'custom'
            }
        rect.bindPopup(customPopup,customOptions);
    
            
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


// draw my diagram
function draw(){
  background("#ff7800");
  
  for (let l1 = 0; l1 < 50; l1++) {
    push();
    value = table.getNum(l1, 3);// get earthquake's depth
    value2 = table.getNum(l1, 4);// get earthquake's mag
    d = map(value, -2, 607.78, 1, 20)//height
    w = map(value2,0.95,6.1, 1, 20 )//width
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(30+20*l1,20,10*w,10*d);
    pop();
  }
  
  for (let l2 = 51; l2 < 100; l2++) {
    push();
    value = table.getNum(l2, 3);// get earthquake's depth
    value2 = table.getNum(l2, 4);// get earthquake's mag
    d = map(value, -2, 607.78, 1, 20)//height
    w = map(value2,0.95,6.1, 1, 20 )//width
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(30+20*(l2-51),80,10*w,10*d);
    pop();
  }
  
  for (let l3 = 101; l3 < 150; l3++) {
    push();
    value = table.getNum(l3, 3);// get earthquake's depth
    value2 = table.getNum(l3, 4);// get earthquake's mag
    d = map(value, -2, 607.78, 1, 20)//height
    w = map(value2,0.95,6.1, 1, 20 )//width
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(30+20*(l3-101),150,10*w,10*d);
    pop();
  }
  
  for (let l4 = 151; l4 < 211; l4++) {
    push();
    value = table.getNum(l4, 3);// get earthquake's depth
    value2 = table.getNum(l4, 4);// get earthquake's mag
    d = map(value, -2, 607.78, 1, 20)//height
    w = map(value2,0.95,6.1, 1, 20 )//width
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(30+20*(l4-151),220,10*w,10*d);
    pop();
  }
  
  
    
};

d3.json("dataAll.json").then(function(data){
    
    
});