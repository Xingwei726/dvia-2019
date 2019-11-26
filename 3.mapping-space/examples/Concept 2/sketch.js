var table;
var mymap;
var longitude;
var latitude;
var magnitude;
var magnitudeInt=[];

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/1.0_day.csv", "csv", "header");

}


function setup(){
    setupMap();
    // addCircles();
    // addRect();
    addRect();
    
    longitude= table.getColumn("longitude")
    latitude= table.getColumn("latitude")
    magnitude=table.getColumn("mag")
    
    
    for (var m=0; m < magnitude.length; m++){
        var value = ceil(magnitude[m])
        magnitudeInt.push(value)

    }


    console.log("table:",table)
    console.log("longtitude",longitude)
    console.log("latitude",latitude)
    console.log("magnitude",magnitude)
    console.log("magnitudeInt",magnitudeInt)



}



function setupMap() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    mymap = L.map('quake-map').setView([51.505, -0.09], 0);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
    
    // var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
    // var rect = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(mymap);
    // // zoom the map to the rectangle bounds
    // mymap.fitBounds(bounds);
    
    // rect.bindPopup("I am a rect")
    
}



// function addRect(){
//         // create an orange rectangle
//     var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
//     L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(mymap);
//     // zoom the map to the rectangle bounds
//     mymap.fitBounds(bounds);
// }





function addRect(){
    
    // var magnitudeMin = 0.0;
    // var magnitudeMax = columnMax(table, "mag");
    // console.log('magnitude range:', [magnitudeMin, magnitudeMax])
    
    // var depthMin = 0.0;
    // var depthMax = columnMax(table, "depth");
    // console.log('depth range:', [depthMin, depthMax])
    
    //x
    var longitudeMin=columnMin(table,"longitude");
    var longitudeMax=columnMax(table,"longitude");
    console.log('longitude range:', [longitudeMin, longitudeMax]);
    //y
    var latitudeMin=columnMin(table,"latitude");
    var latitudeMax=columnMax(table,"latitude");
    console.log('latitude range:', [latitudeMin, latitudeMax]);
    
// var bounds = [[54.559322, -5.767822], [54.559322+1, -5.767822+20]];
// // create an orange rectangle
// L.rectangle(bounds, {color: "#00d5ff", weight: 1}).addTo(mymap);
// // zoom the map to the rectangle bounds
// mymap.fitBounds(bounds);
    
    // var latlngs1 = [[37, -109.05],[39, -109.03+2],[39, -108.05+2],[37, -108.04]];
    // var polygon1 = L.polygon(latlngs1, {color: 'red'}).addTo(mymap);
    // // zoom the map to the polygon
    // mymap.fitBounds(polygon1.getBounds());
    
    
    // var latlngs2 = [[19.1580009, -155.4618378],[19.1580009, -155.4618378+2],[19.1580009+2*2, -155.4618378+2*2],[19.1580009+2, -155.4618378]];
    // var polygon2 = L.polygon(latlngs2, {color: 'red'}).addTo(mymap);
    // // zoom the map to the polygon
    // mymap.fitBounds(polygon2.getBounds());

    
    for (var r=0; r<table.getRowCount(); r++){
        var row = table.getRow(r);
        var bounds= [[row.getNum('latitude'), row.getNum('longitude')],[row.getNum('latitude')+ceil(row.getNum('mag')), row.getNum('longitude')+ceil(row.getNum('mag'))]];
        var rect = L.rectangle( bounds, {color: "#ff7800", weight: 1} ).addTo(mymap);
            rect.bindPopup("latitude value, longitude value");

        mymap.fitBounds(bounds);
    }
    
}

// function weight(magvalue){
    
//     var w1=1;
//     var w2=5;
//     var weightR=[];
//     for (var c=1; c<190; c++){
//         var value= ceil(map(magnitude[c],columnMin(table,"mag"),columnMax(table,"mag"), w1, w2 ))
//         weightR.push(value);
        
//     }
//     console.log("weightR:", weightR)

    
// }



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

