const mapboxgl = require('mapbox-gl');
const config = require('./config');

class MapBoxClass {
  setMapPosition(latitude, longitude) {
    mapboxgl.accessToken = config.mapBoxAccessToken;
    this.mapBox = new mapboxgl.Map({
      container: 'idMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 11,
    });
  }

  flyToPosition(latitude, longitude) {
    this.mapBox.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  }
}

module.exports = MapBoxClass;
