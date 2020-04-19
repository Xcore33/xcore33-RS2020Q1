/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { burger, header } from './index.js';

function onClick(el) {
  if (!el.target.closest('.burger-menu__item, .header-menu')) {
    burger.classList.remove('burger-menu_active');
    header.classList.remove('_active');
  }
  if (el.target.closest('a.header-menu__item')) {
    burger.classList.remove('burger-menu_active');
    header.classList.remove('_active');
  }
}

function flipCard(a) {
  document.querySelectorAll('.scene__card')[+a.target.getAttribute('data-target')].classList.toggle('translate');
  setTimeout(add, 700);
}

function add() {
  document.addEventListener('mouseout', mouseOut);
}

function mouseOut(a) {
  if (!a.target.closest('.look')) {
    document.querySelector('.translate').classList.remove('translate');
    document.removeEventListener('mouseout', mouseOut);
  }
}

export { onClick, flipCard };
