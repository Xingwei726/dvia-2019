var table;
var mymap;

function preload(){
        table = loadTable("../data/all_month.csv", "csv", "header");

}

function setup(){
    setupMap()

    // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    createCanvas(800, 600)
    background(222) 
}

function setupMap(){
  mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

    
}


