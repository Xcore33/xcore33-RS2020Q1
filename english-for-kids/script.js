document.querySelector('.one').addEventListener('click', () => {
    document.querySelector('.menuToggle').classList.toggle('menuToggleActive');
    document.querySelector('.menuToggle').classList.contains('menuToggleActive');
    document.querySelector('.menu').classList.toggle('menuActive')
});

document.querySelector('.switch-input').addEventListener('click', () => {
    document.querySelector('.switch-label').classList.toggle('switch-label-play');
    document.querySelector('.switch-handle').classList.toggle('switch-handle-active');
});

let state = false;
let play = false;
let main = true;

document.querySelector('.switch').addEventListener('mousedown', () => {
    if (play) {
        document.querySelectorAll('.rotate').forEach(key => {
            key.style.zIndex = '1';
        });
        play = false;
    } else {
        document.querySelectorAll('.rotate').forEach(key => {
            key.style.zIndex = '-1';
        });
        play = true;
    }
    document.querySelectorAll('.main-card').forEach(key => {
        key.classList.toggle('green')
    });
    document.querySelectorAll('.card').forEach(key => {
        key.classList.toggle('card-cover')
    });
    document.querySelectorAll('.card-header').forEach(key => {
        key.classList.toggle('none')
    });
    document.querySelector('.btn').classList.toggle('nothing');
    document.querySelector('.menu').classList.toggle('green');
    console.log(2)

});

document.querySelectorAll('.rotate').forEach(key => {
    key.addEventListener('click', () => {
        key.parentElement.classList.toggle('translate');
        state = true;
    })
});

document.querySelectorAll('.card').forEach(key => {
    key.addEventListener('mouseout', () => {
        if (state) {
            key.classList.toggle('translate');
            state = false;
        }
    })
});

document.querySelectorAll('.header-item').forEach(key => {
    key.addEventListener('click', (e) => {
        let i = 0;
        let j;
        if (!e.currentTarget.classList.contains('active') && e.currentTarget.innerHTML !== document.querySelector('.header-item').innerHTML) {
            document.querySelector('.secondary-container').classList.remove('none');
            document.querySelector('.main-container').classList.add('none');
            document.querySelectorAll('.front').forEach(key=>{
                j = count[i];
                key.style.backgroundImage = cards[e.currentTarget.innerHTML][j].image;
                i++;
            });
            i = 0;
            document.querySelectorAll('.back').forEach(key=>{
                j = count[i];
                key.style.backgroundImage = cards[e.currentTarget.innerHTML][j].image;
                i++;
            });
            i = 0;
            document.querySelectorAll('.card-header-front').forEach(key=>{
                j = count[i];
                key.innerHTML = cards[e.currentTarget.innerHTML][j].word;
                i++;
            });
            i=0;
            document.querySelectorAll('.card-header-back').forEach(key=>{
                j = count[i];
                key.innerHTML = cards[e.currentTarget.innerHTML][j].translation;
                i++;
            });
            i=0;
        } else {
            if(e.currentTarget.innerHTML === document.querySelector('.header-item').innerHTML) {
                  document.querySelector('.secondary-container').classList.add('none');
                  document.querySelector('.main-container').classList.remove('none')
            }
        }
        document.querySelector('.active').classList.remove('active');
        e.currentTarget.classList.toggle('active');
    })
});

const count = ['first','second','third','fourth','fifes','six','sevens','eighth'];

const cards = {
    'Action (set A)' : {
        first : {
            word: 'cry',
            translation: 'плакать',
            image: 'url("assets/img/cry.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'dance',
            translation: 'танцевац',
            image: 'url("assets/img/dance.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'dive',
            translation: 'нырять',
            image: 'url("assets/img/dive.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'draw',
            translation: 'рисовать',
            image: 'url("assets/img/draw.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'fish',
            translation: 'ловить рыбу',
            image: 'url("assets/img/fish.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'fly',
            translation: 'летать',
            image: 'url("assets/img/fly.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'hug',
            translation: 'обнимать',
            image: 'url("assets/img/hug.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'jump',
            translation: 'прыгать',
            image: 'url("assets/img/jump.jpg")',
            audioSRC: '',
        },
    },

    'Action (set B)' : {
        first : {
            word: 'open',
            translation: 'открывать',
            image: 'url("assets/img/open.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'play',
            translation: 'играть',
            image: 'url("assets/img/play.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'point',
            translation: 'указывать',
            image: 'url("assets/img/point.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'ride',
            translation: 'ездить',
            image: 'url("assets/img/ride.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'run',
            translation: 'бегать',
            image: 'url("assets/img/run.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'sing',
            translation: 'петь',
            image: 'url("assets/img/sing.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'skip',
            translation: 'пропускать, прыгать',
            image: 'url("assets/img/skip.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'swim',
            translation: 'плавать',
            image: 'url("assets/img/swim.jpg")',
            audioSRC: '',
        },
    },

    'Action (set C)' : {
        first : {
            word: 'argue',
            translation: 'спорить',
            image: 'url("assets/img/argue.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'build',
            translation: 'строить',
            image: 'url("assets/img/build.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'carry',
            translation: 'нести',
            image: 'url("assets/img/carry.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'catch',
            translation: 'ловить',
            image: 'url("assets/img/catch.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'drive',
            translation: 'водить машину',
            image: 'url("assets/img/drive.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'drop',
            translation: 'падать',
            image: 'url("assets/img/drop.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'pull',
            translation: 'тянуть',
            image: 'url("assets/img/pull.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'push',
            translation: 'толкать',
            image: 'url("assets/img/push.jpg")',
            audioSRC: '',
        },
    },

    'Adjective' : {
        first : {
            word: 'big',
            translation: 'большой',
            image: 'url("assets/img/big.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'small',
            translation: 'маленький',
            image: 'url("assets/img/small.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'fast',
            translation: 'быстрый',
            image: 'url("assets/img/fast.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'slow',
            translation: 'медленный',
            image: 'url("assets/img/slow.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'friendly',
            translation: 'дружелюбный',
            image: 'url("assets/img/friendly.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'unfriendly',
            translation: 'недружелюбный',
            image: 'url("assets/img/unfriendly.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'young',
            translation: 'молодой',
            image: 'url("assets/img/young.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'old',
            translation: 'старый',
            image: 'url("assets/img/old.jpg")',
            audioSRC: '',
        },
    },

    'Animal (set A)' : {
        first : {
            word: 'cat',
            translation: 'кот',
            image: 'url("assets/img/cat.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'chick',
            translation: 'цыплёнок',
            image: 'url("assets/img/chick.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'chicken',
            translation: 'курица',
            image: 'url("assets/img/chicken.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'dog',
            translation: 'собака',
            image: 'url("assets/img/dog.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'horse',
            translation: 'лошадь',
            image: 'url("assets/img/horse.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'pig',
            translation: 'свинья',
            image: 'url("assets/img/pig.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'rabbit',
            translation: 'кролик',
            image: 'url("assets/img/rabbit.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'sheep',
            translation: 'овца',
            image: 'url("assets/img/sheep.jpg")',
            audioSRC: '',
        },
    },

    'Animal (set B)' : {
        first : {
            word: 'bird',
            translation: 'птица',
            image: 'url("assets/img/bird.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'fish',
            translation: 'рыба',
            image: 'url("assets/img/fish1.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'frog',
            translation: 'лягушка',
            image: 'url("assets/img/frog.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'giraffe',
            translation: 'жираф',
            image: 'url("assets/img/giraffe.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'lion',
            translation: 'лев',
            image: 'url("assets/img/lion.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'mouse',
            translation: 'мышь',
            image: 'url("assets/img/mouse.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'turtle',
            translation: 'черепаха',
            image: 'url("assets/img/turtle.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'dolphin',
            translation: 'дельфин',
            image: 'url("assets/img/dolphin.jpg")',
            audioSRC: '',
        },
    },

    'Clothes' : {
        first : {
            word: 'skirt',
            translation: 'юбка',
            image: 'url("assets/img/skirt.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'pants',
            translation: 'брюки',
            image: 'url("assets/img/pants.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'blouse',
            translation: 'блузка',
            image: 'url("assets/img/blouse.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'dress',
            translation: 'платье',
            image: 'url("assets/img/dress.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'boot',
            translation: 'ботинки',
            image: 'url("assets/img/boot.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'shirt',
            translation: 'рубашка',
            image: 'url("assets/img/shirt.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'coat',
            translation: 'пальто',
            image: 'url("assets/img/coat.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'shoe',
            translation: 'туфли',
            image: 'url("assets/img/shoe.jpg")',
            audioSRC: '',
        },
    },

    'Emotions' : {
        first : {
            word: 'sad',
            translation: 'грустный',
            image: 'url("assets/img/sad.jpg")',
            audioSRC: '',
        },
        second : {
            word: 'angry',
            translation: 'сердитый',
            image: 'url("assets/img/angry.jpg")',
            audioSRC: '',
        },
        third : {
            word: 'happy',
            translation: 'счастливый',
            image: 'url("assets/img/happy.jpg")',
            audioSRC: '',
        },
        fourth : {
            word: 'tired',
            translation: 'уставший',
            image: 'url("assets/img/tired.jpg")',
            audioSRC: '',
        },
        fifes : {
            word: 'surprised',
            translation: 'удивленный',
            image: 'url("assets/img/surprised.jpg")',
            audioSRC: '',
        },
        six : {
            word: 'scared',
            translation: 'испуганный',
            image: 'url("assets/img/scared.jpg")',
            audioSRC: '',
        },
        sevens : {
            word: 'smile',
            translation: 'улыбка',
            image: 'url("assets/img/smile.jpg")',
            audioSRC: '',
        },
        eighth : {
            word: 'laugh',
            translation: 'смех',
            image: 'url("assets/img/laugh.jpg")',
            audioSRC: '',
        },
    }
};
