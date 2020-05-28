import './scss/main.scss';

import main from './js/main';
import pageLayout from './js/pageLayout';

const initApp = async () => {
  pageLayout.renderLayout();

  main.loadSettings();

  await main.generateAppDataByIP();

  await main.changeBackgroundImage();

  main.setDOMHandlers();

  const updateDelay = 1000;
  setInterval(main.updateTime, updateDelay);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
