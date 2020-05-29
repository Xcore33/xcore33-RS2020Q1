import errorContainer from './main';

const config = require('./config');

const getWeatherDataByPosition = async (latitude, longitude, language = 'en') => {
  const queryParams = `${config.darkSkySecretKey}/${latitude},${longitude}?lang=${language}`;
  const requestUrl = `${config.proxyURL}${config.darkSkyBaseUrl}${queryParams}`;

  const response = await fetch(requestUrl);
  const weatherData = await response.json();
  if (response.status !== 200) {
    errorContainer.innerHTML = 'Status API: Request limit reached';
  }
  return weatherData;
};

export default {
  getWeatherDataByPosition,
};
