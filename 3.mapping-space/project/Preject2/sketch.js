var dates = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29","30","31" ];


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

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);


map.addControl(new mapboxgl.FullscreenControl());


var chapters = {
    'intro': {
        // bearing: 27,
        bearing: 0,
        center: [-64.9385, 17.9101],
        zoom: 0.5,
        pitch: 0
    },
    'magnitude': {
        duration: 6000,
        center: [-0.07571203, 51.51424049],
        bearing: 150,
        zoom: 15,
        pitch: 0
    },
    'depth': {
        bearing: 90,
        center: [-0.08533793, 51.50438536],
        zoom: 13,
        speed: 0.6,
        pitch: 40
    },
    'gap': {
        bearing: 90,
        center: [0.05991101, 51.48752939],
        zoom: 12.3
    },
    'error1': {
        bearing: 45,
        center: [-0.18335806, 51.49439521],
        zoom: 15.3,
        pitch: 20,
        speed: 0.5
    },
    'end': {
        bearing: 0,
        center: [-64.9385, 17.9101],
        zoom: 0.5,
        pitch: 0
    }
};

window.onscroll = function () {
    var chapterNames = Object.keys(chapters);
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
    map.flyTo(chapters[chapterName]);
    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');
    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}











function filterBy(date) {
    var filters = ['==', 'date', date];
    map.setFilter('earthquake-circles', filters);

    // Set the label to the month
    document.getElementById('date').textContent = dates[date];
}




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
                        '#ff7800',
                        6.8,
                        '#3D4DE0'
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


            // map.addLayer({
            //     'id': 'terrain-data',
            //     'type': 'line',
            //     'source': {
            //         type: 'vector',
            //         url: 'mapbox://mapbox.mapbox-terrain-v2'
            //     },
            //     'source-layer': 'contour',
            //     'layout': {
            //         'line-join': 'round',
            //         'line-cap': 'round'
            //     },
            //     'paint': {
            //         'line-color': '#ff69b4',
            //         'line-width': 1
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
       
});


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

    popup
    .setLngLat([coor1,coor2])
    .setHTML(
      "<h3>Magnitude:</h3>"+"<p>"+ mag +"</p>"+
      "<h3>Location:</h3>"+"<p>"+ place +"</p>"
    )
    
    .addTo(map);
        
});


map.on('mouseleave', 'earthquake-circles', function() {
    map.getCanvas().style.cursor = '';
        popup.remove();
});
                    
                
                