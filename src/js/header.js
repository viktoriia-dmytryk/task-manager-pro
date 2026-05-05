import { onStartMenuRender } from './main-screen';
import { refs } from './refs';

refs.toMenuBtn.addEventListener('click', onToMenuBtnClick);

function onToMenuBtnClick(event) {
  onStartMenuRender();
}
