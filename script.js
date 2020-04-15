document.querySelector('.one').addEventListener('click', () => {
    document.querySelector('.menuToggle').classList.toggle('menuToggleActive');
   console.log(1);
    if(document.querySelector('.menuToggle').classList.contains('menuToggleActive')) {
        document.querySelector('.menu').classList.toggle('menuActive')
    } else {
        document.querySelector('.menu').classList.toggle('menuActive')
    }
});

document.querySelector('.switch-input').addEventListener('click', ()=> {
   document.querySelector('.switch-label').classList.toggle('switch-label-play');
    document.querySelector('.switch-handle').classList.toggle('switch-handle-active');
});
