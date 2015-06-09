define(function (require) {

var places = require('./places');
require(['googlemaps!'], function(gmaps) {

var geocoder;
var map;
var address ="Stuttgart, Germany";

  geocoder = new gmaps.Geocoder();
  var latlng = new gmaps.LatLng(-34.397, 150.644);
  var myOptions = {
    zoom: 13,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: gmaps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: gmaps.MapTypeId.HYBRID
  };
  map = new gmaps.Map(document.getElementById("map_canvas"), myOptions);
  if (geocoder) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == gmaps.GeocoderStatus.OK) {
        if (status != gmaps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    places.places().forEach(function(places) {
      geocoder.geocode( { 'address': places.address}, function(results, status) {
        if (status == gmaps.GeocoderStatus.OK) {
          if (status != gmaps.GeocoderStatus.ZERO_RESULTS) {
            var marker = new MarkerWithLabel({
              position: results[0].geometry.location,
              map: map,
              title: places.name,
              labelContent: places.name,
              labelClass: "labels"
            });
          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    });
  }

});
});
