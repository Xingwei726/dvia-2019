//mapbox setup
mapboxgl.accessToken = "pk.eyJ1IjoiaHVhbng0MjkiLCJhIjoiY2szMzRzNHpqMGpiZDNib3EzbGgweHR0eSJ9.FbzMgwMQ7oL8uqZBSJqF2A";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/huanx429/ck49eg2dl0d9i1clobu3mwf5a',
    // style:'mapbox://styles/huanx429/ck49emtl80e4t1colqdqm8hol',
    center: [31.4606, 20.7927],
    zoom: 0.5,
    bearing: 0,
    pitch: 0
});

var dates = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29","30","31" ];

//mapbox add control icon
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

map.addControl(new mapboxgl.FullscreenControl());


//significant earthquakes
var significant = {
    'intro': {
        // bearing: 27,
        bearing: 0,
        center: [31.4606, 20.7927],//lng, lat
        zoom: 0.5,
        pitch: 0
    },
    'magnitude': {
        duration: 6000,
        center: [125.1884, 6.7078],
        bearing: 150,
        zoom: 10,
        pitch: 0
    },
    'depth': {
        bearing: 0,
        center: [178.3264,-26.6111],
        zoom: 5,
        speed: 0.5,
        pitch: 10
    },
    'negDepth': {
        bearing: 0,
        center: [-155.5966644, 19.4746666],
        zoom: 5,
        speed: 0.5
        
    },
    'magError': {
        bearing: 0,
        center: [-120.3511, 39.4663],
        zoom: 10,
        pitch: 0,
        speed: 0.5
    },
    'depthError': {
        bearing: 0,
        center: [-155.5070038, 19.4963341],
        zoom: 5,
        pitch: 20,
        speed: 0.5
    },
    'station': {
        bearing: 0,
        center:  [-64.049, -64.774],
        zoom: 5,
        pitch: 0
    },
    'origin': {
        bearing: 0,
        center:  [31.4606, 20.7927],
        zoom: 0.5,
        pitch: 0
    }
};

//scroll setup
window.onscroll = function () {
    var chapterNames = Object.keys(significant);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};

var activeChapterName = 'intro';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;
    map.flyTo(significant[chapterName]);
    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');
    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}





//Day Slider Setup
function filterBy(date) {
    var filters = ['==', 'date', date];
    map.setFilter('earthquake-circles', filters);

    // Set the label to the month
    document.getElementById('date').textContent = dates[date];
}



//Draw markers on Map
map.on('load', function () {
    d3.json('data/all.geojson', function (err, data) {
        
            if (err) throw err;

            data.features = data.features.map(function (d) {
                d.properties.date = new Date(d.properties.time).getDate();
                return d;
            });


            var geojson = map.addSource('earthquakes', {
                'type': 'geojson',
                data: data
            });

            map.addLayer({
                'id': 'earthquake-circles',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-color': [ 'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        -1.38,
                        '#3D4DE0',
                        6.8,
                        '#ff7800'
                    ],

                    'circle-opacity': 1,
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'rms'],
                        1,
                        5,
                        10,
                        20
                    ]
                }
            });
            


            // map.addLayer({
            //     'id': 'earthquake-labels',
            //     'type': 'symbol',
            //     'source': 'earthquakes',
            //     'layout': {
            //         'text-field': [
            //             'concat',
            //             ['to-string', ['get', 'mag']],
            //             'm'
            //         ],
            //         'text-font': [
            //             'Open Sans Bold',
            //             'Arial Unicode MS Bold'
            //         ],
            //         'text-size': 12
            //     },
            //     'paint': {
            //         'text-color': 'rgba(0,0,0,0.5)'
            //     }
            // });
            
            
            map.on('click', 'earthquake-circles', function(e) {
                map.flyTo({ center: e.features[0].geometry.coordinates });
            });
             
            map.on('mouseenter', 'earthquake-circles', function() {
                map.getCanvas().style.cursor = 'pointer';
            });
             
            map.on('mouseleave', 'earthquake-circles', function() {
                map.getCanvas().style.cursor = '';
            });

            filterBy(0);

            document
                .getElementById('slider')
                .addEventListener('input', function (e) {
                    var date = parseInt(e.target.value, 10);
                    filterBy(date);
                });
            
            // for (var i=0; i<data.features.length; i++){
            //     earthquake.push(data.features[i].properties.mag);
                // lng.push(data.features[i].geometry.coordinates[0]);
                // lat.push(data.features[i].geometry.coordinates[1]);
                // depth.push(data.features[i].geometry.coordinates[2])
                
            // }  
            
        });

       
//Add Earthquake fault lines        
        map.addSource('faults', {
          'type': 'geojson',
          'data': 'data/faults.geojson'
        });
        map.addLayer({
          'id': 'faults',
          'type': 'line',
          'source': 'faults',
          'paint': {
            'line-color': '#7d756a',
            }
        })  
        
        
//Add Significant markers        
        map.addSource('marks', {
            'type': 'geojson',
            'data': 'data/significantMarks.geojson'
        });

        map.loadImage(
            'marker.png',
            function(error, image) {
            if (error) throw error;
            map.addImage('marker', image);    
            map.addLayer({
                "id": "significant",
                // "interactive": true,
                "type": "symbol",
                "source": "marks",
                "layout": {
                    "icon-image": 'marker',
                    "icon-size": 0.036
                },
                "paint": {
                    /*"text-size": 10,*/
                }
            });
         });
        

        
        
       
});



//Popup Window Setup
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});


map.on('mouseenter', 'earthquake-circles', function(e) {
    map.getCanvas().style.cursor = 'pointer';
     
    var coor1 = e.features[0].geometry.coordinates[0];
    var coor2 = e.features[0].geometry.coordinates[1];
    var place = e.features[0].properties.place;
    var mag = e.features[0].properties.mag;
    var gap = e.features[0].properties.gap;
     
    console.log(coor1)
    // console.log(depth)

    // popup
    // .setLngLat([coor1,coor2])
    // .setHTML(
    //   "<h3>Location:</h3>"+"<p>"+ place +"</p>"+
    //   "<h3>Magnitude:</h3>"+"<p>"+ mag +"</p>"
    // )
    // .addTo(map);
    popup
    .setLngLat([coor1,coor2])
    .setHTML(
      "Location: "+ place +"<br/>"+
      "Magnitude: "+ mag
    )
    .addTo(map);
        
});


map.on('mouseleave', 'earthquake-circles', function() {
    map.getCanvas().style.cursor = '';
        popup.remove();
});
                    

map.on('mouseenter', 'significant', function(e) {
    map.getCanvas().style.cursor = 'pointer';
     
    var coor1 = e.features[0].geometry.coordinates[0];
    var coor2 = e.features[0].geometry.coordinates[1];

    var place = e.features[0].properties.place;
    var mag = e.features[0].properties.mag;
    var gap = e.features[0].properties.gap;
     
    console.log(coor1)
    // console.log(depth)

    // popup
    // .setLngLat([coor1,coor2])
    // .setHTML(
    //   "<h3>Location:</h3>"+"<p>"+ place +"</p>"+
    //   "<h3>Magnitude:</h3>"+"<p>"+ mag +"</p>"
    // )
    // .addTo(map);
    popup
    .setLngLat([coor1,coor2])
    .setHTML(
      "Location: "+ place +"<br/>"+
      "Magnitude: "+ mag
    )
    .addTo(map);
        
});


map.on('mouseleave', 'significant', function() {
    map.getCanvas().style.cursor = '';
        popup.remove();
});             
                