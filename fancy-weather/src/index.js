import './scss/main.scss';

import domHelper from './js/domHelper';

const initApp = async () => {

  domHelper.loadSettings();

  await domHelper.generateAppDataByIP();

  await domHelper.changeBackgroundImage();

  domHelper.setDOMHandlers();

  const updateDelay = 6000;
  setInterval(domHelper.updateTime, updateDelay);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
