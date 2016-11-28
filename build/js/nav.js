var mainMenuBtn = document.querySelector('.header__btn');
var nav = document.querySelector('.nav');
var menuImg = document.querySelector('.header__btn-img');

mainMenuBtn.addEventListener('click', openClose);

function openClose(click) {
  nav.classList.toggle('open-close-js');

  if (nav.classList.contains('open-close-js')) {
    menuImg.src = 'img/open-icon.svg';
  } else {
    menuImg.src = 'img/close-icon.svg';
  }
}
