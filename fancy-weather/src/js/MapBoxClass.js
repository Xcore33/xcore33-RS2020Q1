const mapboxgl = require('mapbox-gl');
const config = require('./config');

export default class Mapbox {
  setMapPosition(latitude, longitude) {
    mapboxgl.accessToken = config.mapboxAccessToken;
    this.mapbox = new mapboxgl.Map({
      container: 'idMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 11,
    });
  }

  flyToPosition(latitude, longitude) {
    this.mapbox.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  }
}
