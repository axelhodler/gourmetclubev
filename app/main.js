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
              var overlay = new CustomMarker(
                results[0].geometry.location,
                map,
                {
                  name: places.name
                }
              );
            } else {
              alert("No results found");
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      });
    }

    function CustomMarker(latlng, map, args) {
      this.latlng = latlng;
      this.args = args;
      this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {

      var self = this;

      var div = this.div;

      if (!div) {
	div = this.div = document.createElement('div');
        div.innerHTML = "<h3>" + self.args.name + "</h3>";
        div.className = 'marker';

	div.style.position = 'absolute';
	div.style.cursor = 'pointer';
        div.style.color = 'white';

	var panes = this.getPanes();
	panes.overlayImage.appendChild(div);
      }

      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

      if (point) {
	div.style.left = point.x + 'px';
	div.style.top = point.y + 'px';
      }
    };
  });
});
