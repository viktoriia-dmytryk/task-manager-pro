import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getFromLocalStorage, saveToLocalStorage } from './storage';
import { escapeHTML, onNotesListClick } from './handlers';

refs.toMenuBtn.style.display = 'none';

export const taskArray = getFromLocalStorage(`taskStorage`) || [];
function taskBtnListRerderer() {
  const taskList = taskArray
    .map(item => {
      return `<li class="notes-list-item">
              <button class="notes-btn" type="button" data-id="${item.taskId}">${escapeHTML(item.title)}</button>
              <button class="delete-note-btn">✕</button>
              
            </li>`;
    })
    .join('');
  return taskList;
}

document.addEventListener('DOMContentLoaded', onStartMenuRender);

export function onStartMenuRender(event) {
  refs.mainPage.innerHTML = `<section class="main-screen">
        <div class="container main-container">
          <ul class="notes-list">
            <li class="notes-list-item">
              <button class="create-btn" type="button">+</button>
            </li>
          </ul>
        </div>
      </section>`;

  refs.notesList.insertAdjacentHTML('beforeend', taskBtnListRerderer());
  refs.toMenuBtn.style.display = 'none';

  refs.createBtn.addEventListener('click', onCreateBtnClick);
  refs.notesList.addEventListener('click', onNotesListClick);
}

function onCreateBtnClick(event) {
  const modalTaskCreate =
    basicLightbox.create(`<h2 class="title-task-title">Введіть назву нового переліку завдань:</h2>
        <form class="task-form">
    <input
        class="task-name-input"
        type="text"
        name="title"
        autocomplete="off"
        maxlength="30"
        placeholder="Додайте назву завдання..."
    />
    <button class="title-task-btn" type="submit">Додати</button>
    </form>`);

  modalTaskCreate.show();
  const input = modalTaskCreate.element().querySelector('.task-name-input');
  setTimeout(() => {
    input.focus();
  }, 0);

  const taskCreateBtn = modalTaskCreate
    .element()
    .querySelector('.title-task-btn');
  taskCreateBtn.addEventListener(
    'click',
    event => {
      event.preventDefault();
      const inputTitleTask = modalTaskCreate
        .element()
        .querySelector('.task-name-input');
      const inputTitleValue = inputTitleTask.value.trim();
      if (!inputTitleValue) return;

      taskArray.push({
        taskId: Date.now(),
        title: inputTitleValue,
        notes: [],
      });
      saveToLocalStorage(`taskStorage`, taskArray);
      modalTaskCreate.close();
      onStartMenuRender();
    },
    { once: true }
  );
}

function deleteCurrentNotes(event) {}
