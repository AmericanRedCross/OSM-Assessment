var map_imagery = L.map('map_imagery', {scrollWheelZoom: false});

var bing = new L.BingLayer('Ag9jQYKyfz8w2R8pQPutymFLnwYTlSVyNrwAMnHRi8T41Rr9UzpmNlvMujMARYQM');
var hiu = new L.TileLayer('http://hiu-maps.net/hot/1.0.0/taclobancity-post-flipped/{z}/{x}/{y}.png', {attribution: "&copy; US Government (USG) under the NextView (NV) License"});

var group = L.layerGroup([hiu,bing]);
group.addTo(map_imagery);

var range = document.getElementById('range');
function clip() {
	var nw = map_imagery.containerPointToLayerPoint([0, 0]),
	se = map_imagery.containerPointToLayerPoint(map_imagery.getSize()),
	clipX = nw.x + (se.x - nw.x) * range.value;
	bing.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
	bing.getContainer().style.zIndex="999"; //manually sets zIndex of bing(overlay) layer moving it to front
}
range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map_imagery.on('move', clip);
map_imagery.setView([11.246261, 125.004519], 16);