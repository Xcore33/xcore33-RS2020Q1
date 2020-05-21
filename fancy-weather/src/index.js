import './scss/main.scss';

const domHelper = require('./js/domHelper');

const initApp = async () => {
  await domHelper.generateAppDataByIP();

  await domHelper.changeBackgroundImage();

  domHelper.setDOMHandlers();

  const updateDelay = 6000;
  setInterval(domHelper.updateTime, updateDelay);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
