require(['googlemaps!'], function(gmaps) {

var places = [
  {"name": "87", "address" : "König-Karl-Straße 87, Stuttgart"},
  {"name": "Gigis Burgerbar", "address" : "Theodor-Heuss-Strasse 34, 70174 Stuttgart"},
  {"name": "Bonnie and Clyde", "address": "Heinrich Baumann Str. 24, 70190 Stuttgart"},
  {"name": "Madagascar", "address": "Filderstrasse 61, 70180 Stuttgart"},
  {"name": "Ceylonas", "address": "Reinsburgstraße 74 70178 Stuttgart"},
  {"name": "Tshito Gwrito", "address": "Heinrich-Baumann-Straße 23, 70190 Stuttgart"},
  {"name": "Ebony", "address" : "Herzogstrasse 11, 70176 Stuttgart"},
  {"name": "Gerüchteküche-Stuttgart", "address": "Rotebühlstrasse 159, 70197 Stuttgart"}
];

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
    places.forEach(function(places) {
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
