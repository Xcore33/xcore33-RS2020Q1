/* eslint-disable no-console */
import './scss/main.scss';

const geoPosition = require('./js/geoPosition');
const weather = require('./js/weather');
const image = require('./js/image');
const map = require('./js/map');
const domHelper = require('./js/domHelper');

const initApp = async () => {
  const geoPositionData = await geoPosition.getGeoPosition();
  const cityName = geoPositionData.city;
  const countryName = geoPositionData.country;
  console.log('geoPositionData', geoPositionData);
  console.log('cityName', cityName, 'countryName', countryName);
  const [latitude, longitude] = [...geoPositionData.loc.split(',')];
  console.log('latitude', latitude, 'longitude', longitude);

  const weatherData = await weather.getWeatherDataByPosition(latitude, longitude);
  const imageData = await image.getImageUrl();
  map.setMapPosition(latitude, longitude);

  const isCelsius = true;
  domHelper.updateAppView(cityName, countryName, latitude, longitude, weatherData, isCelsius);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
