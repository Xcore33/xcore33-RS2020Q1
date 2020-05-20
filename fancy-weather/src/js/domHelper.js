const settings = require('./settings');
const image = require('./image');
const geoPosition = require('./geoPosition');

const generateAppData = async () => {
  settings.geoPositionData = await geoPosition.getGeoPosition();
  settings.cityName = settings.geoPositionData.city;
  settings.countryName = settings.geoPositionData.country;
  const [latitude, longitude] = [...settings.geoPositionData.loc.split(',')];
  settings.latitude = latitude;
  settings.longitude = longitude;
  settings.weatherData = JSON.parse(localStorage.getItem('weatherData'));
};

const updateAppView = () => {
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${settings.cityName}, ${settings.countryName}`;

  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();
  currentDateTimeElement.textContent = `${dateTime.toDateString()} ${dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`;

  const coordinatesElement = document.getElementById('idCoordinates');
  const [lat, long] = [settings.latitude, settings.longitude].map(coordinate => `${coordinate}'`.replace('.', `°`));
  coordinatesElement.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;

  const currentTemperature = settings.isCelsius
    ? parseInt((settings.weatherData.currently.temperature - 32) / 1.8)
    : parseInt(settings.weatherData.currently.temperature);
  const feelsLike = settings.isCelsius
    ? parseInt((settings.weatherData.currently.apparentTemperature - 32) / 1.8)
    : parseInt(settings.weatherData.currently.apparentTemperature);
  const { windSpeed, humidity, icon } = settings.weatherData.currently;

  const weatherCardDetailedElement = document.querySelector('.weather-card-detailed');
  weatherCardDetailedElement.querySelector('.weather-card-temperature').textContent = `${currentTemperature}°`;
  weatherCardDetailedElement.querySelector(
    '.weather-card-extra-info',
  ).innerHTML = `Feels like: ${feelsLike}° <br>Wind: ${windSpeed} m/s <br>Humidity: ${humidity * 100}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);

  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  weatherCardsElements.forEach((weatherCard, index) => {
    const weekDay = new Date(settings.weatherData.daily.data[index + 1].time * 1000).toLocaleDateString('en-EN', {
      weekday: 'long',
    });
    const temperature = settings.isCelsius
      ? parseInt((settings.weatherData.daily.data[index + 1].temperatureMin - 32) / 1.8)
      : parseInt(settings.weatherData.daily.data[index + 1].temperatureMin);
    weatherCard.querySelector('.weather-card-day').textContent = weekDay;
    weatherCard.querySelector('.weather-card-temperature').textContent = `${temperature}°`;
    weatherCard
      .querySelector('.weather-card-icon')
      .setAttribute('src', `./assets/images/weather_icons/${settings.weatherData.daily.data[index + 1].icon}.png`);
  });
};

const changeBackgroundImage = async () => {
  const imageData = await image.getImageUrl();
  document.getElementById('idBGImage').style.background = `url("${imageData.urls.regular}") no-repeat`;
  document.getElementById('idBGImage').style.backgroundSize = 'cover';
};

const changeTemperatureScale = async () => {
  settings.isCelsius = !settings.isCelsius;
  updateAppView();
};

const setDOMHandlers = () => {
  document.getElementById('idSwitchImageButton').addEventListener('click', changeBackgroundImage);
  document.getElementById('idSwitchTemperatureButton').addEventListener('click', changeTemperatureScale);
};

module.exports = {
  updateAppView,
  setDOMHandlers,
  changeBackgroundImage,
  changeTemperatureScale,
  generateAppData,
};
