
function initMap() {
// Create a map object and specify the DOM element for display.
var map1 = new google.maps.Map(document.getElementById('map1'), {
	center: {lat: -34.397, lng: 150.644},
	zoom: 8
});
// Create a map object and specify the DOM element for display.
var map2 = new google.maps.Map(document.getElementById('map2'), {
	center: {lat: -34.397, lng: 150.644},
	zoom: 8
});

map1.lastCenter = map1.getCenter();
map2.lastCenter = map2.getCenter();

var zoomProgrammaticallyChanged = false;
var centerProgrammaticallyChanged = false;

map1.addListener("zoom_changed", function(){

	if(!zoomProgrammaticallyChanged){
		zoomProgrammaticallyChanged = true;
		map2.setZoom(map1.getZoom());
	}
	else{
		zoomProgrammaticallyChanged = false;
	}
});


map2.addListener("zoom_changed", function(){
	
	if(!zoomProgrammaticallyChanged){
		zoomProgrammaticallyChanged = true;
		map1.setZoom(map2.getZoom());
	}
	else{
		zoomProgrammaticallyChanged = false;
	}
});

map1.addListener("center_changed", function(){
	if(!centerProgrammaticallyChanged){
		centerProgrammaticallyChanged = true;
		var center = map1.getCenter();
		var diff = { 'lat': map1.lastCenter.lat() - center.lat(), 
					'lng': map1.lastCenter.lng() - center.lng()}


		map1.lastCenter = center;
		map2.lastCenter = map2.getCenter();

		map2.setCenter({lat: map2.lastCenter.lat() - diff.lat,
						lng: map2.lastCenter.lng() - diff.lng});
	}
	else{
		centerProgrammaticallyChanged = false;
	}
});

map2.addListener("center_changed", function(){
	if(!centerProgrammaticallyChanged){
		centerProgrammaticallyChanged = true;
		var center = map2.getCenter();
		var diff = { 'lat': map2.lastCenter.lat() - center.lat(), 
					'lng': map2.lastCenter.lng() - center.lng()}


		map2.lastCenter = center;
		map1.lastCenter = map1.getCenter();

		map1.setCenter({lat: map1.lastCenter.lat() - diff.lat,
						lng: map1.lastCenter.lng() - diff.lng});
	}
	else{
		centerProgrammaticallyChanged = false;
	}
});
}

