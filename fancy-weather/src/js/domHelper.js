/* eslint-disable no-console */
const updateAppView = (cityName, countryName, latitude, longitude, weatherData, isCelsius) => {
  const cityNameElement = document.getElementById('idCityName');
  cityNameElement.textContent = `${cityName}, ${countryName}`;
  const currentDateTimeElement = document.getElementById('idCurrentDateTime');
  const dateTime = new Date();
  currentDateTimeElement.textContent = `${dateTime.toDateString()} ${dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })}`;
  const coordinatesElement = document.getElementById('idCoordinates');
  const [lat, long] = [latitude, longitude].map(coordinate => `${coordinate}'`.replace('.', `°`));
  coordinatesElement.innerHTML = `Latitude: ${lat} <br> Longitude: ${long}`;
  const currentTemperature = isCelsius
    ? parseInt((weatherData.currently.temperature - 32) / 1.8)
    : parseInt(weatherData.currently.temperature);
  console.log('currentTemperature', currentTemperature);
  const feelsLike = isCelsius
    ? parseInt((weatherData.currently.apparentTemperature - 32) / 1.8)
    : parseInt(weatherData.currently.apparentTemperature);
  console.log('feelsLike', feelsLike);
  const { windSpeed, humidity, icon } = weatherData.currently;
  console.log('windSpeed', windSpeed);
  console.log('humidity', `${humidity * 100}%`);
  console.log('icon', icon);
  const weatherCardDetailedElement = document.querySelector('.weather-card-detailed');
  console.log('weatherCardDetailedElement', weatherCardDetailedElement);
  weatherCardDetailedElement.querySelector('.weather-card-temperature').textContent = `${currentTemperature}°`;
  weatherCardDetailedElement.querySelector(
    '.weather-card-extra-info',
  ).innerHTML = `Feels like: ${feelsLike}° <br>Wind: ${windSpeed} m/s <br>Humidity: ${humidity * 100}%`;
  weatherCardDetailedElement
    .querySelector('.weather-card-icon')
    .setAttribute('src', `./assets/images/weather_icons/${icon}.png`);
  const weatherCardsElements = document.querySelectorAll('.weather-future .weather-card');
  weatherCardsElements.forEach((weatherCard, index) => {
    console.log('weatherData.daily.data[index]', weatherData.daily.data[index + 1]);
    const weekDay = new Date(weatherData.daily.data[index + 1].time * 1000).toLocaleDateString('en-EN', {
      weekday: 'long',
    });
    const temperature = isCelsius
      ? parseInt((weatherData.daily.data[index + 1].temperatureMin - 32) / 1.8)
      : parseInt(weatherData.daily.data[index + 1].temperatureMin);
    weatherCard.querySelector('.weather-card-day').textContent = weekDay;
    weatherCard.querySelector('.weather-card-temperature').textContent = `${temperature}°`;
    weatherCard
      .querySelector('.weather-card-icon')
      .setAttribute('src', `./assets/images/weather_icons/${weatherData.daily.data[index + 1].icon}.png`);
  });
};

module.exports = {
  updateAppView,
};
