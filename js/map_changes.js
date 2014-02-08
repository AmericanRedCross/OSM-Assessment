// initialize map
var map_changes = L.map('map_changes', {scrollWheelZoom: false}).setView([11, 124], 7);

// creates style for changesetsLayer and then creates changesetsLayer
var changesetsLayerStyle = {
    "color": "#ff0000",
    "weight": .5,
    "opacity": .5,
	"fillOpacity": 0
};
var changesetsLayer = L.geoJson(undefined,{style:changesetsLayerStyle}).addTo(map_changes);

// creates style for combinedTasksLayer and then creates combinedTasksLayer
var combinedTasksLayerStyle = {
    "color": "#004b79",
    "weight": .5,
    "opacity": .5,
	"fillOpacity": 0
};
var combinedTasksLayer = L.geoJson(undefined,{style:combinedTasksLayerStyle});

// add OSM base layer
var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors.  OSM Changesets from Pascal Neis (<a href="http://resultmaps.neis-one.org/osm-typhoon-haiyan-2013#8/11.084/123.635">neis-one.org</a>)',
    maxZoom: 18
}).addTo(map_changes);

// add data from respective geojson file to changesetsLayer
$.getJSON( "data/changesets.geojson", function( data ) {changesetsLayer.addData(data);});

// add data from respective geojson file to combinedTasksLayer
$.getJSON( "data/combined_tasks.geojson", function( data ) {combinedTasksLayer.addData(data);});

// add osmLayer to baseMaps object which will be used for layers control
var baseMaps = {"OSM": osmLayer};

// add layers to overlayMaps object which will be used for layers control
var overlayMaps = {"Combined Tasks": combinedTasksLayer, "Changesets": changesetsLayer};

// add the baseMaps and overlayMaps objects to layers control
L.control.layers(baseMaps, overlayMaps).addTo(map_changes);

// initialize legend control
var legend = L.control({position: 'bottomright'});

//initialize html code
legend.onAdd = function (map_changes) {
    var div = L.DomUtil.create('div', 'info legend');
	div.innerHTML += '<i style="background: #FF0000"></i>OSM Changes<br></br>';
	div.innerHTML += '<i style="background: #004b79"></i>OSM Tasks';
    return div;
};

//add the legend html code to the map
legend.addTo(map_changes);