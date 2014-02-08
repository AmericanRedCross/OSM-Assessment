//initialize map
var map_classification = L.map('map_classification', {scrollWheelZoom: false}).setView([11, 124], 7);

//Add OSM GeoJSON Layers
var osmDamageNoLayerStyle = {"color": "rgb(188,219,144", "fillColor": "#4D6131", "fillOpacity": 1, "opacity": 1};
var osmDamageNoLayer = L.geoJson(undefined,{style:osmDamageNoLayerStyle}).addTo(map_classification);
$.getJSON("data/osm_damage_no.geojson", function( data ) {osmDamageNoLayer.addData(data);});

var osmDamageDamagedLayerStyle = {"color": "rgb(240,202,106)", "fillColor": "#55492D", "fillOpacity": 1, "opacity": 1};
var osmDamageDamagedLayer = L.geoJson(undefined,{style:osmDamageDamagedLayerStyle}).addTo(map_classification);
$.getJSON("data/osm_damage_damaged.geojson", function( data ) {osmDamageDamagedLayer.addData(data);});

var osmDamageTotalLayerStyle = {"color": "rgb(213,41,56)", "fillColor": "#D52938", "fillOpacity": 1, "opacity": 1};
var osmDamageTotalLayer = L.geoJson(undefined,{style:osmDamageTotalLayerStyle}).addTo(map_classification);
$.getJSON("data/osm_damage_destroyed.geojson", function( data ) {osmDamageTotalLayer.addData(data);});

var osmDamageLayerGROUP = L.layerGroup([osmDamageNoLayer, osmDamageDamagedLayer, osmDamageTotalLayer]).addTo(map_classification);

//Add OSM GeoJSON Layers
var observedDamageNoLayerStyle = {"color": "rgb(188,219,144)", "fillColor": "#4D6131", "fillOpacity": 1, "opacity": 1};
var observedDamageNoLayer = L.geoJson(undefined,{style:observedDamageNoLayerStyle}).addTo(map_classification);
$.getJSON("data/observed_damage_no.geojson", function( data ) {observedDamageNoLayer.addData(data);});

var observedDamagePartialLayerStyle = {"color": "rgb(233,202,152)", "fillColor": "#5F4E33", "fillOpacity": 1, "opacity": 1};
var observedDamagePartialLayer = L.geoJson(undefined,{style:observedDamagePartialLayerStyle}).addTo(map_classification);
$.getJSON("data/observed_damage_partial.geojson", function( data ) {observedDamagePartialLayer.addData(data);});

var observedDamageMajorLayerStyle = {"color": "rgb(240,202,106)", "fillColor": "#55492D", "fillOpacity": 1, "opacity": 1};
var observedDamageMajorLayer = L.geoJson(undefined,{style:observedDamageMajorLayerStyle}).addTo(map_classification);
$.getJSON("data/observed_damage_major.geojson", function( data ) {observedDamageMajorLayer.addData(data);});

var observedDamageTotalLayerStyle = {"color": "rgb(213,41,56)", "fillColor": "#D52938", "fillOpacity": 1, "opacity": 1};
var observedDamageTotalLayer = L.geoJson(undefined,{style:observedDamageTotalLayerStyle}).addTo(map_classification);
$.getJSON("data/observed_damage_total.geojson", function( data ) {observedDamageTotalLayer.addData(data);});

var observedDamageLayerGROUP = L.layerGroup([observedDamageNoLayer, observedDamagePartialLayer, observedDamageMajorLayer, observedDamageTotalLayer]).addTo(map_classification);

// add OSM as base layer
var osm_basemap  = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map_classification);

// create add the baseMaps and overlayMaps objects to layers control
var baseMaps = {"OSM Basemap": osm_basemap};
var overlayMaps = {"OSM Classification": osmDamageLayerGROUP, "Field Classification": observedDamageLayerGROUP};

L.control.layers(baseMaps, overlayMaps).addTo(map_classification);

// initialize legend control
var legend = L.control({position: 'bottomright'});

//initialize html code
legend.onAdd = function (map_classification) {
    var div = L.DomUtil.create('div', 'info legend_classification');
	div.innerHTML += '<b>Observed Damage Classification Schema</b></br>';
	div.innerHTML += '<i style="background: rgb(188,219,144);"></i>No Damages</br>';
	div.innerHTML += '<i style="background: rgb(233,202,152);"></i>Partial Damages</br>';
	div.innerHTML += '<i style="background: rgb(240,202,106);"></i>Major Damages</br>';
	div.innerHTML += '<i style="background: rgb(213,41,56);"></i>TotalDamages</br>';
	
	div.innerHTML += '<b>OSM Damage Classifications</b></br>';
	div.innerHTML += '<i style="background: rgb(188,219,144);"></i>No Damages</br>';
	div.innerHTML += '<i style="background: rgb(240,202,106);"></i>Major Damages</br>';
	div.innerHTML += '<i style="background: rgb(213,41,56);"></i>TotalDamages</br>';

    return div;
};

//add the legend html code to the map
legend.addTo(map_classification);