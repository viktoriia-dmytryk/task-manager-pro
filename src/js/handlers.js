import Sortable from 'sortablejs';
import { onStartMenuRender, taskArray } from './main-screen';
import { refs } from './refs';
import { saveToLocalStorage, getFromLocalStorage } from './storage';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
let currentTaskId = null;
let editingNoteId = null;

export function onNotesListClick(event) {
  const btn = event.target.closest('.notes-btn');

  if (event.target.closest('.delete-note-btn')) {
    removeElementModal(`Бажаєте видалити це завдання?`, () => {
      const btnDel = event.target.closest('.delete-note-btn');

      const li = btnDel.closest('.notes-list-item');
      if (!li) return;
      const noteId = Number(li.querySelector('.notes-btn').dataset.id);

      const index = taskArray.findIndex(item => item.taskId === noteId);
      if (index !== -1) {
        taskArray.splice(index, 1);
      }

      saveToLocalStorage('taskStorage', taskArray);
      onStartMenuRender();
    });
  }
  if (btn) {
    const id = Number(btn.dataset.id);
    currentTaskId = id;

    const currentNotesList = taskArray.find(element => element.taskId === id);
    if (!currentNotesList) return;

    refs.mainPage.innerHTML = `<section class="section-task">
    <div class="container notes">
      <h1 class="title">${escapeHTML(currentNotesList.title)}</h1>
      <form class="controls-form" autocomplete="off">
        <input
          class="task-input"
           maxlength="50"
          type="text"
          name="task"
          placeholder="Додайте наступне завдання..."
        />
        <button class="add" type="submit">Додати до списку</button>
      </form>
      <ul class="list-task"></ul>

    </div>
  </section>`;

    Sortable.create(refs.listTask, {
      animation: 250,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
    });

    refs.toMenuBtn.style.display = '';
    renderNotes();

    refs.formTask.addEventListener('submit', onAddBtnTaskSubmit);
    refs.listTask.addEventListener('change', onListTaskClick);
    refs.listTask.addEventListener('click', onListTaskClickDelete);
    refs.listTask.addEventListener('click', onListEdit);
  }
}

export function onAddBtnTaskSubmit(event) {
  event.preventDefault();

  const inputText = refs.inputTask.value.trim();
  if (!inputText) return;

  onNewNotesAdded(inputText, currentTaskId);
  renderNotes();

  refs.formTask.reset();
}

function onNewNotesAdded(text, id) {
  const task = taskArray.find(element => element.taskId === id);
  if (!task) return;

  task.notes.push({
    id: Date.now(),
    text,
    completed: false,
  });

  saveToLocalStorage('taskStorage', taskArray);
}

function renderNotes() {
  const task = taskArray.find(item => item.taskId === currentTaskId);
  if (!task) return;

  refs.listTask.innerHTML = task.notes
    .map(note => {
      return `
      <li class="list-item" data-id="${note.id}">
        <label class="task-label">
          <input class="check visually-hidden" type="checkbox" ${
            note.completed ? 'checked' : ''
          }/>
          <span class="checkbox-span">${note.completed ? '☑️' : '⬜'}</span>
          <span class="task-text ${
            note.completed ? 'strikethrough' : ''
          }"></span>
        </label>

        <button class="edit-btn" type="button">✒️</button>
        <button class="remove-smile" type="button">✖️</button>
      </li>
    `;
    })
    .join('');
  refs.listTask.querySelectorAll('.list-item').forEach(li => {
    const id = Number(li.dataset.id);
    const note = task.notes.find(n => n.id === id);
    if (!note) return;

    li.querySelector('.task-text').textContent = note.text;
  });
}

// *а це стирає тільки один пункт
export function onListTaskClickDelete(event) {
  const btn = event.target.closest('.remove-smile');
  console.log(event.target);
  if (!btn) return;

  const li = btn.closest('.list-item');
  const noteId = Number(li.dataset.id);
  removeElementModal(`Бажаєте видалити це завдання?`, () => {
    deleteNote(noteId);
    renderNotes();
  });
}

export function deleteNote(noteId) {
  const task = taskArray.find(item => item.taskId === currentTaskId);
  if (!task) return;
  task.notes = task.notes.filter(item => item.id !== noteId);
  saveToLocalStorage('taskStorage', taskArray);
}
// *а це модалка з бібліотеки, викликається в функціях стирання замість confirm,
// *в аргументи треба повідомлення, яке треба вивести, і функція, яку треба виконати при стиранні
export function removeElementModal(message, onConfirm) {
  const modalOverlay =
    basicLightbox.create(`<h2 class="modal-title">${message}</h2>
    <div class="btn-box">
      <button class="del-btn modal-btn-for-style" type="button">Так</button>
      <button class="cancel-btn modal-btn-for-style" type="button">Ні</button>
    </div>`);
  modalOverlay.show();

  const delBtn = document.querySelector('.del-btn');
  const cancelBtn = document.querySelector('.cancel-btn');

  cancelBtn.addEventListener(
    'click',
    () => {
      modalOverlay.close();
    },
    { once: true }
  );

  delBtn.addEventListener(
    'click',
    () => {
      onConfirm();
      modalOverlay.close();
    },
    { once: true }
  );
}

// *ця функція до слухача чекбокса, перекреслює текст і змінює
// * відображуваний чекбокс (смайлики перемикає в залежності від того виконаний таск чи ні)
export function onListTaskClick(event) {
  if (!event.target.classList.contains('check')) return;

  const li = event.target.closest('.list-item');
  const noteId = Number(li.dataset.id);

  const label = event.target.closest('.task-label');
  const checkboxSpan = label.querySelector('.checkbox-span');
  const text = label.querySelector('.task-text');

  const task = taskArray.find(item => item.taskId === currentTaskId);
  if (!task) return;

  const note = task.notes.find(note => note.id === noteId);
  if (!note) return;

  if (event.target.checked) {
    checkboxSpan.textContent = '☑️';
    text.classList.add('strikethrough');
    note.completed = true;
  } else {
    checkboxSpan.textContent = '⬜';
    text.classList.remove('strikethrough');
    note.completed = false;
  }

  saveToLocalStorage('taskStorage', taskArray);
}

export function escapeHTML(str = '') {
  return String(str).replace(/[&<>"']/g, match => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return map[match];
  });
}

export function onListEdit(event) {
  if (!event.target.classList.contains('edit-btn')) return;

  const input = refs.inputTask;

  if (input.value.trim()) {
    const modalEdit = basicLightbox.create(
      `<p class="modal-title">Ви ще не завершили попереднє редагування!</p>`
    );
    modalEdit.show();
    return;
  }

  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  const noteId = Number(listItem.dataset.id);

  const textForEdit = listItem.querySelector('.task-text').textContent;

  input.value = textForEdit;

  deleteNote(noteId);
  renderNotes();
}
