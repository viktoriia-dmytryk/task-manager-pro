import { onStartMenuRender } from './main-screen';
import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.toMenuBtn.addEventListener('click', onToMenuBtnClick);
refs.themeBtn.addEventListener('click', onThemeBtnClick);

function onToMenuBtnClick(event) {
  onStartMenuRender();
}

function onThemeBtnClick(event) {
  const modalTheme = basicLightbox.create(`<div class="theme-btn-wrapper">
      <button class="theme-choise butterfly" type="button" data-background="butterfly">Butterfly</button>
    <button class="theme-choise grass" type="button" data-background="grass">Grass</button>
    <button class="theme-choise year" type="button" data-background="year">New Year</button>
    <button class="theme-choise violet" type="button" data-background="violet">Flower</button></div>`);

  modalTheme.show();
  const wrapper = modalTheme.element().querySelector('.theme-btn-wrapper');
  wrapper.addEventListener(
    'click',
    event => {
      if (!event.target.classList.contains('theme-choise')) return;
      switch (event.target.dataset.background) {
        case 'butterfly':
          document.body.style.backgroundImage =
            'url("../images/butterfly.svg")';
          break;
        case 'grass':
          document.body.style.backgroundImage = 'url("../images/grass.svg")';
          break;
        case 'year':
          document.body.style.backgroundImage =
            'url("../images/red-new-year.svg")';
          break;
        case 'violet':
          document.body.style.backgroundImage =
            'url("../images/violet-flower.svg")';
          break;
      }
      modalTheme.close();
      document.body.className = `theme-${event.target.dataset.background}`;
    },
    { once: true }
  );
}
