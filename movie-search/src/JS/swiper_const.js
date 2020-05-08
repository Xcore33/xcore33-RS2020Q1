import Swiper from 'swiper';

export const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  init: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    842: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1030: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  },
  keyboard: true,
});
