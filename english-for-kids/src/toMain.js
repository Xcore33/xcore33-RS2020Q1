/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { defaultRemove } from './index.js';

const errors = 0;
const mainMenu = document.querySelector('.main-menu');
const library = document.querySelector('.library');
const menuItem = document.querySelector('.header-menu__item');
const cardFace = document.querySelectorAll('.scene__card_face');


export function goBackToMain() {
  document.querySelectorAll('.scene').forEach((key) => {
    key.classList.add('hidden');
  });
  document.querySelector('.starter').classList.add('hidden');
  document.querySelector('.library_progress-bar').classList.add('text');
  document.querySelector('.header').classList.add('hidden');
  if (errors === 0) {
    document.body.classList.add('success');
    setTimeout(() => {
      document.body.classList.remove('success');
    }, 3000);
    document.querySelector('.library_progress-bar').innerHTML = 'win!';
    document.querySelector('.reaction').src = 'assets/audio/success.mp3';
  } else {
    document.body.classList.add('failure');
    setTimeout(() => {
      document.body.classList.remove('failure');
    }, 3000);
    document.querySelector('.library_progress-bar').innerHTML = `${errors} errors`;
    document.querySelector('.reaction').src = 'assets/audio/failure.mp3';
  }
  setTimeout(() => {
    document.querySelector('.library_progress-bar').innerHTML = '';
  }, 3000);
  setTimeout(() => {
    defaultRemove();
    document.querySelectorAll('.scene').forEach((key) => {
      key.classList.remove('hidden');
    });
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.library_progress-bar').classList.remove('text');
    document.querySelector('.starter').classList.remove('hidden');
    document.querySelector('.active').classList.remove('active');
    menuItem.classList.add('active');
    library.classList.add('hidden');
    mainMenu.classList.remove('hidden');

    cardFace.forEach((key) => {
      key.classList.toggle('front-play');
    });
  }, 3000);
}
