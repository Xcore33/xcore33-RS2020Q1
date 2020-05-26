import './scss/main.scss';

import domHelper from './js/domHelper';
import layoutGenerator from './js/layoutGenerator';

const initApp = async () => {
  layoutGenerator.renderLayout();

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
