let state = false;
let play = false;
let sound = [];
let page;
let gameStart = true;
let correct = 0;
let currentSound = 0;
let errors = 0;


document.querySelector('.burger-menu__item').addEventListener('click', () => {
  document.querySelector('.burger-menu').classList.toggle('burger-menu_active');
  document.querySelector('.burger-menu').classList.contains('burger-menu_active');
  document.querySelector('.header-menu').classList.toggle('_active');
});


document.querySelector('.slider__input').addEventListener('click', () => {
  defaultRemove();
  document.querySelector('.slider__label').classList.toggle('slider__label_play');
  document.querySelector('.slider__handle').classList.toggle('slider__handle_active');
});

document.querySelector('.slider').addEventListener('mousedown', () => {
  if (play) {
    document.querySelectorAll('.scene__card_flip').forEach((key) => {
      key.classList.remove('collapse');
    });
    play = false;
  } else {
    document.querySelectorAll('.scene__card_flip').forEach((key) => {
      key.classList.add('collapse');
    });
    play = true;
  }
  document.querySelectorAll('.main-menu__item').forEach((key) => {
    key.classList.toggle('interactive');
  });
  document.querySelectorAll('.scene__card').forEach((key) => {
    key.classList.toggle('scene__card-cover');
  });
  document.querySelectorAll('.look__header').forEach((key) => {
    key.classList.toggle('hidden');
  });
  document.querySelector('.starter__item').classList.toggle('invisibly');
  document.querySelector('.header-menu').classList.toggle('interactive');
});


document.querySelectorAll('.scene__card_flip').forEach((key) => {
  key.addEventListener('click', () => {
    key.parentElement.classList.toggle('translate');
    state = true;
  });
});

document.querySelectorAll('.scene__card').forEach((key) => {
  key.addEventListener('mouseout', () => {
    if (state) {
      key.classList.toggle('translate');
      state = false;
    }
  });
});


document.querySelectorAll('.header-menu__item').forEach((key) => {
  key.addEventListener('click', (e) => {
    page = e.currentTarget.innerText;
    let i = 0;
    let j;
    if (!e.currentTarget.classList.contains('active') && e.currentTarget.innerHTML !== document.querySelector('.header-menu__item').innerHTML) {
      document.querySelector('.library').classList.remove('hidden');
      document.querySelector('.main-menu').classList.add('hidden');
      document.querySelectorAll('.scene__card_face').forEach((key) => {
        j = count[i];
        key.style.backgroundImage = cards[page][j].image;
        i++;
      });
      i = 0;
      document.querySelectorAll('.scene__card_back').forEach((key) => {
        j = count[i];
        key.style.backgroundImage = cards[page][j].image;
        i++;
      });
      i = 0;
      document.querySelectorAll('.look__header_front').forEach((key) => {
        j = count[i];
        key.innerHTML = cards[page][j].word;
        i++;
      });
      i = 0;
      document.querySelectorAll('.look__header_back').forEach((key) => {
        j = count[i];
        key.innerHTML = cards[page][j].translation;
        i++;
      });
      i = 0;
    } else if (e.currentTarget.innerHTML === document.querySelector('.header-menu__item').innerHTML) {
      document.querySelector('.library').classList.add('hidden');
      document.querySelector('.main-menu').classList.remove('hidden');
    }
    defaultRemove();
    document.querySelector('.active').classList.remove('active');
    e.currentTarget.classList.toggle('active');
  });
});


document.querySelectorAll('.scene__card_face').forEach((key) => {
  let currentTarget;
  key.addEventListener('click', (e) => {
    if (play === false) {
      currentTarget = cards[page][e.currentTarget.getAttribute('num')].audioSRC;
      document.querySelector('.voice').src = `${currentTarget}`;
    }
  });
});


document.querySelectorAll('.main-menu__item').forEach((key) => {
  key.addEventListener('click', (e) => {
    page = e.currentTarget.innerText;
    let i = 0;
    let j;
    document.querySelector('.library').classList.remove('hidden');
    document.querySelector('.main-menu').classList.add('hidden');
    document.querySelectorAll('.scene__card_face').forEach((key) => {
      j = count[i];
      key.style.backgroundImage = cards[page][j].image;
      i++;
    });
    i = 0;
    document.querySelectorAll('.scene__card_back').forEach((key) => {
      j = count[i];
      key.style.backgroundImage = cards[page][j].image;
      i++;
    });
    i = 0;
    document.querySelectorAll('.look__header_front').forEach((key) => {
      j = count[i];
      key.innerText = cards[page][j].word;
      i++;
    });
    i = 0;
    document.querySelectorAll('.look__header_back').forEach((key) => {
      j = count[i];
      key.innerText = cards[page][j].translation;
      i++;
    });
    i = 0;
    document.querySelector('.active').classList.remove('active');
    document.querySelectorAll('.header-menu__item').forEach((key) => {
      if (page === key.innerText) {
        key.classList.toggle('active');
      }
    });
  });
});

function defaultRemove() {
  document.querySelectorAll('.scene__card_face').forEach((key) => {
    key.classList.remove('front-play');
  });
  document.querySelectorAll('.inactive').forEach((key) => {
    key.classList.remove('inactive');
  });
  document.querySelector('.starter__item').classList.remove('repeat');
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

const count = ['first', 'second', 'third', 'fourth', 'fifes', 'six', 'sevens', 'eighth'];

const cards = {
  sound: {},

  'Action (set A)': {
    first: {
      word: 'cry',
      translation: 'плакать',
      image: 'url("assets/img/cry.jpg")',
      audioSRC: 'assets/audio/cry.mp3',
    },
    second: {
      word: 'dance',
      translation: 'танцевать',
      image: 'url("assets/img/dance.jpg")',
      audioSRC: 'assets/audio/dance.mp3',
    },
    third: {
      word: 'dive',
      translation: 'нырять',
      image: 'url("assets/img/dive.jpg")',
      audioSRC: 'assets/audio/dive.mp3',
    },
    fourth: {
      word: 'draw',
      translation: 'рисовать',
      image: 'url("assets/img/draw.jpg")',
      audioSRC: 'assets/audio/draw.mp3',
    },
    fifes: {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'url("assets/img/fish.jpg")',
      audioSRC: 'assets/audio/fish.mp3',
    },
    six: {
      word: 'fly',
      translation: 'летать',
      image: 'url("assets/img/fly.jpg")',
      audioSRC: 'assets/audio/fly.mp3',
    },
    sevens: {
      word: 'hug',
      translation: 'обнимать',
      image: 'url("assets/img/hug.jpg")',
      audioSRC: 'assets/audio/hug.mp3',
    },
    eighth: {
      word: 'jump',
      translation: 'прыгать',
      image: 'url("assets/img/jump.jpg")',
      audioSRC: 'assets/audio/jump.mp3',
    },
  },

  'Action (set B)': {
    first: {
      word: 'open',
      translation: 'открывать',
      image: 'url("assets/img/open.jpg")',
      audioSRC: 'assets/audio/open.mp3',
    },
    second: {
      word: 'play',
      translation: 'играть',
      image: 'url("assets/img/play.jpg")',
      audioSRC: 'assets/audio/play.mp3',
    },
    third: {
      word: 'point',
      translation: 'указывать',
      image: 'url("assets/img/point.jpg")',
      audioSRC: 'assets/audio/point.mp3',
    },
    fourth: {
      word: 'ride',
      translation: 'ездить',
      image: 'url("assets/img/ride.jpg")',
      audioSRC: 'assets/audio/ride.mp3',
    },
    fifes: {
      word: 'run',
      translation: 'бегать',
      image: 'url("assets/img/run.jpg")',
      audioSRC: 'assets/audio/run.mp3',
    },
    six: {
      word: 'sing',
      translation: 'петь',
      image: 'url("assets/img/sing.jpg")',
      audioSRC: 'assets/audio/sing.mp3',
    },
    sevens: {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'url("assets/img/skip.jpg")',
      audioSRC: 'assets/audio/skip.mp3',
    },
    eighth: {
      word: 'swim',
      translation: 'плавать',
      image: 'url("assets/img/swim.jpg")',
      audioSRC: 'assets/audio/swim.mp3',
    },
  },

  'Action (set C)': {
    first: {
      word: 'argue',
      translation: 'спорить',
      image: 'url("assets/img/argue.jpg")',
      audioSRC: 'assets/audio/argue.mp3',
    },
    second: {
      word: 'build',
      translation: 'строить',
      image: 'url("assets/img/build.jpg")',
      audioSRC: 'assets/audio/build.mp3',
    },
    third: {
      word: 'carry',
      translation: 'нести',
      image: 'url("assets/img/carry.jpg")',
      audioSRC: 'assets/audio/carry.mp3',
    },
    fourth: {
      word: 'catch',
      translation: 'ловить',
      image: 'url("assets/img/catch.jpg")',
      audioSRC: 'assets/audio/catch.mp3',
    },
    fifes: {
      word: 'drive',
      translation: 'водить машину',
      image: 'url("assets/img/drive.jpg")',
      audioSRC: 'assets/audio/drive.mp3',
    },
    six: {
      word: 'drop',
      translation: 'падать',
      image: 'url("assets/img/drop.jpg")',
      audioSRC: 'assets/audio/drop.mp3',
    },
    sevens: {
      word: 'pull',
      translation: 'тянуть',
      image: 'url("assets/img/pull.jpg")',
      audioSRC: 'assets/audio/pull.mp3',
    },
    eighth: {
      word: 'push',
      translation: 'толкать',
      image: 'url("assets/img/push.jpg")',
      audioSRC: 'assets/audio/push.mp3',
    },
  },

  Adjective: {
    first: {
      word: 'big',
      translation: 'большой',
      image: 'url("assets/img/big.jpg")',
      audioSRC: 'assets/audio/big.mp3',
    },
    second: {
      word: 'small',
      translation: 'маленький',
      image: 'url("assets/img/small.jpg")',
      audioSRC: 'assets/audio/small.mp3',
    },
    third: {
      word: 'fast',
      translation: 'быстрый',
      image: 'url("assets/img/fast.jpg")',
      audioSRC: 'assets/audio/fast.mp3',
    },
    fourth: {
      word: 'slow',
      translation: 'медленный',
      image: 'url("assets/img/slow.jpg")',
      audioSRC: 'assets/audio/slow.mp3',
    },
    fifes: {
      word: 'friendly',
      translation: 'дружелюбный',
      image: 'url("assets/img/friendly.jpg")',
      audioSRC: 'assets/audio/friendly.mp3',
    },
    six: {
      word: 'unfriendly',
      translation: 'недружелюбный',
      image: 'url("assets/img/unfriendly.jpg")',
      audioSRC: 'assets/audio/unfriendly.mp3',
    },
    sevens: {
      word: 'young',
      translation: 'молодой',
      image: 'url("assets/img/young.jpg")',
      audioSRC: 'assets/audio/young.mp3',
    },
    eighth: {
      word: 'old',
      translation: 'старый',
      image: 'url("assets/img/old.jpg")',
      audioSRC: 'assets/audio/old.mp3',
    },
  },

  'Animal (set A)': {
    first: {
      word: 'cat',
      translation: 'кот',
      image: 'url("assets/img/cat.jpg")',
      audioSRC: 'assets/audio/cat.mp3',
    },
    second: {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'url("assets/img/chick.jpg")',
      audioSRC: 'assets/audio/chick.mp3',
    },
    third: {
      word: 'chicken',
      translation: 'курица',
      image: 'url("assets/img/chicken.jpg")',
      audioSRC: 'assets/audio/chicken.mp3',
    },
    fourth: {
      word: 'dog',
      translation: 'собака',
      image: 'url("assets/img/dog.jpg")',
      audioSRC: 'assets/audio/dog.mp3',
    },
    fifes: {
      word: 'horse',
      translation: 'лошадь',
      image: 'url("assets/img/horse.jpg")',
      audioSRC: 'assets/audio/horse.mp3',
    },
    six: {
      word: 'pig',
      translation: 'свинья',
      image: 'url("assets/img/pig.jpg")',
      audioSRC: 'assets/audio/pig.mp3',
    },
    sevens: {
      word: 'rabbit',
      translation: 'кролик',
      image: 'url("assets/img/rabbit.jpg")',
      audioSRC: 'assets/audio/rabbit.mp3',
    },
    eighth: {
      word: 'sheep',
      translation: 'овца',
      image: 'url("assets/img/sheep.jpg")',
      audioSRC: 'assets/audio/sheep.mp3',
    },
  },

  'Animal (set B)': {
    first: {
      word: 'bird',
      translation: 'птица',
      image: 'url("assets/img/bird.jpg")',
      audioSRC: 'assets/audio/bird.mp3',
    },
    second: {
      word: 'fish',
      translation: 'рыба',
      image: 'url("assets/img/fish1.jpg")',
      audioSRC: 'assets/audio/fish1.mp3',
    },
    third: {
      word: 'frog',
      translation: 'лягушка',
      image: 'url("assets/img/frog.jpg")',
      audioSRC: 'assets/audio/frog.mp3',
    },
    fourth: {
      word: 'giraffe',
      translation: 'жираф',
      image: 'url("assets/img/giraffe.jpg")',
      audioSRC: 'assets/audio/giraffe.mp3',
    },
    fifes: {
      word: 'lion',
      translation: 'лев',
      image: 'url("assets/img/lion.jpg")',
      audioSRC: 'assets/audio/lion.mp3',
    },
    six: {
      word: 'mouse',
      translation: 'мышь',
      image: 'url("assets/img/mouse.jpg")',
      audioSRC: 'assets/audio/mouse.mp3',
    },
    sevens: {
      word: 'turtle',
      translation: 'черепаха',
      image: 'url("assets/img/turtle.jpg")',
      audioSRC: 'assets/audio/turtle.mp3',
    },
    eighth: {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'url("assets/img/dolphin.jpg")',
      audioSRC: 'assets/audio/dolphin.mp3',
    },
  },

  Clothes: {
    first: {
      word: 'skirt',
      translation: 'юбка',
      image: 'url("assets/img/skirt.jpg")',
      audioSRC: 'assets/audio/skirt.mp3',
    },
    second: {
      word: 'pants',
      translation: 'брюки',
      image: 'url("assets/img/pants.jpg")',
      audioSRC: 'assets/audio/pants.mp3',
    },
    third: {
      word: 'blouse',
      translation: 'блузка',
      image: 'url("assets/img/blouse.jpg")',
      audioSRC: 'assets/audio/blouse.mp3',
    },
    fourth: {
      word: 'dress',
      translation: 'платье',
      image: 'url("assets/img/dress.jpg")',
      audioSRC: 'assets/audio/dress.mp3',
    },
    fifes: {
      word: 'boot',
      translation: 'ботинки',
      image: 'url("assets/img/boot.jpg")',
      audioSRC: 'assets/audio/boot.mp3',
    },
    six: {
      word: 'shirt',
      translation: 'рубашка',
      image: 'url("assets/img/shirt.jpg")',
      audioSRC: 'assets/audio/shirt.mp3',
    },
    sevens: {
      word: 'coat',
      translation: 'пальто',
      image: 'url("assets/img/coat.jpg")',
      audioSRC: 'assets/audio/coat.mp3',
    },
    eighth: {
      word: 'shoe',
      translation: 'туфли',
      image: 'url("assets/img/shoe.jpg")',
      audioSRC: 'assets/audio/shoe.mp3',
    },
  },

  Emotions: {
    first: {
      word: 'sad',
      translation: 'грустный',
      image: 'url("assets/img/sad.jpg")',
      audioSRC: 'assets/audio/sad.mp3',
    },
    second: {
      word: 'angry',
      translation: 'сердитый',
      image: 'url("assets/img/angry.jpg")',
      audioSRC: 'assets/audio/angry.mp3',
    },
    third: {
      word: 'happy',
      translation: 'счастливый',
      image: 'url("assets/img/happy.jpg")',
      audioSRC: 'assets/audio/happy.mp3',
    },
    fourth: {
      word: 'tired',
      translation: 'уставший',
      image: 'url("assets/img/tired.jpg")',
      audioSRC: 'assets/audio/tired.mp3',
    },
    fifes: {
      word: 'surprised',
      translation: 'удивленный',
      image: 'url("assets/img/surprised.jpg")',
      audioSRC: 'assets/audio/surprised.mp3',
    },
    six: {
      word: 'scared',
      translation: 'испуганный',
      image: 'url("assets/img/scared.jpg")',
      audioSRC: 'assets/audio/scared.mp3',
    },
    sevens: {
      word: 'smile',
      translation: 'улыбка',
      image: 'url("assets/img/smile.jpg")',
      audioSRC: 'assets/audio/smile.mp3',
    },
    eighth: {
      word: 'laugh',
      translation: 'смех',
      image: 'url("assets/img/laugh.jpg")',
      audioSRC: 'assets/audio/laugh.mp3',
    },
  },
};
