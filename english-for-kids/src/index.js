/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import './css/style.css';

import { count, cards } from './cards';
import { shuffle } from './shuffle';
import { onClick, flipCard } from './mouseControl';

let sound = [];
let correct = 0;
let currentSound = 0;
let errors = 0;
let gameStart = true;
let page;
let anchor = false;


const burger = document.querySelector('.burger-menu');
const header = document.querySelector('.header-menu');
const flip = document.querySelectorAll('.scene__card_flip');
const starter = document.querySelector('.starter__item');
const mainMenu = document.querySelector('.main-menu');
const library = document.querySelector('.library');
const menuItem = document.querySelector('.header-menu__item');
const cardFace = document.querySelectorAll('.scene__card_face');
const List = document.querySelectorAll('.main-menu__item, .header-menu__item');
const mainItem = document.querySelectorAll('.main-menu__item');

document.querySelector('.burger-menu__item').addEventListener('click', () => {
  burger.classList.toggle('burger-menu_active');
  burger.classList.contains('burger-menu_active');
  header.classList.toggle('_active');
  document.addEventListener('click', onClick);
});


document.querySelector('.slider__input').addEventListener('click', () => {
  defaultRemove();
  document.querySelector('.slider__label').classList.toggle('slider__label_play');
  document.querySelector('.slider__handle').classList.toggle('slider__handle_active');
});

document.querySelector('.slider').addEventListener('mousedown', () => {
  if (anchor) {
    flip.forEach((key) => {
      key.classList.remove('collapse');
    });
    anchor = false;
  } else {
    flip.forEach((key) => {
      key.classList.add('collapse');
    });
    anchor = true;
  }
  mainItem.forEach((key) => {
    key.classList.toggle('interactive');
  });
  document.querySelectorAll('.scene__card').forEach((key) => {
    key.classList.toggle('scene__card-cover');
  });
  document.querySelectorAll('.look__header').forEach((key) => {
    key.classList.toggle('hidden');
  });
  starter.classList.toggle('invisibly');
  header.classList.toggle('interactive');
});


flip.forEach((a) => a.addEventListener('click', flipCard));


List.forEach((el) => {
  el.addEventListener('click', (e) => {
    page = e.currentTarget.innerText;
    let i = 0;
    let j;
    if (e.currentTarget.innerHTML !== menuItem.innerHTML) {
      library.classList.remove('hidden');
      mainMenu.classList.add('hidden');
      cardFace.forEach((key) => {
        const faceCard = key;
        j = count[i];
        faceCard.style.backgroundImage = cards[page][j].image;
        i += 1;
      });
      i = 0;
      document.querySelectorAll('.scene__card_back').forEach((key) => {
        const faceCard = key;
        j = count[i];
        faceCard.style.backgroundImage = cards[page][j].image;
        i += 1;
      });
      i = 0;
      document.querySelectorAll('.look__header_front').forEach((key) => {
        const faceCard = key;
        j = count[i];
        faceCard.innerHTML = cards[page][j].word;
        i += 1;
      });
      i = 0;
      document.querySelectorAll('.look__header_back').forEach((key) => {
        const faceCard = key;
        j = count[i];
        faceCard.innerHTML = cards[page][j].translation;
        i += 1;
      });
      i = 0;
    } else if (e.currentTarget.innerHTML === menuItem.innerHTML) {
      library.classList.add('hidden');
      mainMenu.classList.remove('hidden');
    }
    defaultRemove();
    document.querySelector('.active').classList.remove('active');
    e.currentTarget.classList.toggle('active');
  });
});

mainItem.forEach((key) => {
  key.addEventListener('click', () => {
    document.querySelectorAll('.header-menu__item').forEach((c) => {
      if (page === c.innerText) {
        c.classList.toggle('active');
      }
    });
  });
});

cardFace.forEach((key) => {
  let currentTarget;
  let star;
  key.addEventListener('click', (e) => {
    if (anchor === false) {
      currentTarget = cards[page][e.currentTarget.getAttribute('num')].audioSRC;
      document.querySelector('.voice').src = `${currentTarget}`;
    }
    if (e.currentTarget.classList.contains('front-play')) {
      if (e.currentTarget.getAttribute('num') === cards.sound[sound[currentSound]]) {
        star = document.createElement('div');
        e.currentTarget.classList.add('inactive');
        e.currentTarget.classList.remove('front-play');
        document.querySelector('.voice').src = sound[currentSound + 1];
        document.querySelector('.reaction').src = 'assets/audio/correct.mp3';
        star.classList.add('star-success');
        document.querySelector('.library_progress-bar').appendChild(star);
        currentSound += 1;
        correct += 1;
        if (correct === 8) {
          goBackToMain();
        }
      } else {
        star = document.createElement('div');
        document.querySelector('.reaction').src = 'assets/audio/error.mp3';
        star.classList.add('star-error');
        document.querySelector('.library_progress-bar').appendChild(star);
        errors += 1;
      }
    }
  });
  });


starter.addEventListener('click', () => {
  if (gameStart) {
    for (let i = 0; i < 8; i += 1) {
      sound.push(cards[page][count[i]].audioSRC);
      cards.sound[cards[page][count[i]].audioSRC] = count[i];
    }
    shuffle(sound);
    starter.classList.add('repeat');
    cardFace.forEach((key) => {
      key.classList.add('front-play');
    });
    gameStart = false;
  }
  document.querySelector('.voice').src = sound[currentSound];
});

function defaultRemove() {
  cardFace.forEach((key) => {
    key.classList.remove('front-play');
  });
  document.querySelectorAll('.inactive').forEach((key) => {
    key.classList.remove('inactive');
  });
  starter.classList.remove('repeat');
  document.querySelectorAll('.star-success').forEach((key) => {
    key.remove();
  });
  document.querySelectorAll('.star-error').forEach((key) => {
    key.remove();
  });
  sound = [];
  gameStart = true;
  correct = 0;
  currentSound = 0;
  errors = 0;
  cards.sound = {};
}

function goBackToMain() {
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

export { burger, header, defaultRemove };
