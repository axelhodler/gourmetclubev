require.config({
  paths: {
    googlemaps: 'bower_components/googlemaps-amd/src/googlemaps',
    async: 'bower_components/requirejs-plugins/src/async'
  }
});

requirejs(['app/main']);
