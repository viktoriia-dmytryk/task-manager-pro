import{S as y,b as k}from"./assets/vendor-D1F99FMn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const r={get mainPage(){return document.querySelector(".main-page")},get mainScreen(){return document.querySelector(".main-screen")},get taskScreen(){return document.querySelector(".section-task")},get notesList(){return document.querySelector(".notes-list")},get createBtn(){return document.querySelector(".create-btn")},get listTask(){return document.querySelector(".list-task")},get formTask(){return document.querySelector(".controls-form")},get inputTask(){return document.querySelector(".task-input")},get removeBtn(){return document.querySelector(".remove-btn")},get saveBtn(){return document.querySelector(".save-btn")},get title(){return document.querySelector(".title")},get toMenuBtn(){return document.querySelector(".to-menu-btn")}};function u(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.log(n)}}function h(e){try{const t=JSON.parse(localStorage.getItem(e));return t!==null?t:null}catch(t){console.log(t)}}let l=null;function S(e){const t=e.target.closest(".notes-btn");if(!t)return;const n=Number(t.dataset.id);l=n;const o=c.find(s=>s.taskId===n);o&&(r.mainPage.innerHTML=`<section class="section-task">
    <div class="container notes">
      <h1 class="title">${g(o.title)}</h1>
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
  </section>`,y.create(r.listTask,{animation:250,easing:"cubic-bezier(0.25, 1, 0.5, 1)",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag"}),r.toMenuBtn.style.display="",d(),r.formTask.addEventListener("submit",L),r.listTask.addEventListener("change",x),r.listTask.addEventListener("click",T),r.listTask.addEventListener("click",E))}function L(e){e.preventDefault();const t=r.inputTask.value.trim();t&&(v(t,l),d(),r.formTask.reset())}function v(e,t){const n=c.find(o=>o.taskId===t);n&&(n.notes.push({id:Date.now(),text:e,completed:!1}),u("taskStorage",c))}function d(){const e=c.find(t=>t.taskId===l);e&&(r.listTask.innerHTML=e.notes.map(t=>`
      <li class="list-item" data-id="${t.id}">
        <label class="task-label">
          <input class="check visually-hidden" type="checkbox" ${t.completed?"checked":""}/>
          <span class="checkbox-span">${t.completed?"☑️":"⬜"}</span>
          <span class="task-text ${t.completed?"strikethrough":""}"></span>
        </label>

        <button class="edit-btn" type="button">✒️</button>
        <button class="remove-smile" type="button">✖️</button>
      </li>
    `).join(""),r.listTask.querySelectorAll(".list-item").forEach(t=>{const n=Number(t.dataset.id),o=e.notes.find(s=>s.id===n);o&&(t.querySelector(".task-text").textContent=o.text)}))}function T(e){const t=e.target.closest(".remove-smile");if(console.log(e.target),!t)return;const n=t.closest(".list-item"),o=Number(n.dataset.id);q("Бажаєте видалити це завдання?",()=>{b(o),d()})}function b(e){const t=c.find(n=>n.taskId===l);t&&(t.notes=t.notes.filter(n=>n.id!==e),u("taskStorage",c))}function q(e,t){const n=k.create(`<h2 class="modal-title">${e}</h2>
    <div class="btn-box">
      <button class="del-btn modal-btn-for-style" type="button">Так</button>
      <button class="cancel-btn modal-btn-for-style" type="button">Ні</button>
    </div>`);n.show();const o=document.querySelector(".del-btn");document.querySelector(".cancel-btn").addEventListener("click",()=>{n.close()},{once:!0}),o.addEventListener("click",()=>{t(),n.close()},{once:!0})}function x(e){if(!e.target.classList.contains("check"))return;const t=e.target.closest(".list-item"),n=Number(t.dataset.id),o=e.target.closest(".task-label"),s=o.querySelector(".checkbox-span"),a=o.querySelector(".task-text"),i=c.find(f=>f.taskId===l);if(!i)return;const m=i.notes.find(f=>f.id===n);m&&(e.target.checked?(s.textContent="☑️",a.classList.add("strikethrough"),m.completed=!0):(s.textContent="⬜",a.classList.remove("strikethrough"),m.completed=!1),u("taskStorage",c))}function g(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function E(e){if(!e.target.classList.contains("edit-btn"))return;const t=r.inputTask;if(t.value.trim()){k.create('<p class="modal-title">Ви ще не завершили попереднє редагування!</p>').show();return}const n=e.target.closest(".list-item");if(!n)return;const o=Number(n.dataset.id),s=n.querySelector(".task-text").textContent;t.value=s,b(o),d()}r.toMenuBtn.style.display="none";const c=h("taskStorage")||[];function B(){return c.map(t=>`<li class="notes-list-item">
              <button class="notes-btn" type="button" data-id="${t.taskId}">${g(t.title)}</button>
              
            </li>`).join("")}console.log(c);document.addEventListener("DOMContentLoaded",p);function p(e){r.mainPage.innerHTML=`<section class="main-screen">
        <div class="container main-container">
          <ul class="notes-list">
            <li class="notes-list-item">
              <button class="create-btn" type="button">+</button>
            </li>
          </ul>
        </div>
      </section>`,r.notesList.insertAdjacentHTML("beforeend",B()),r.toMenuBtn.style.display="none",r.createBtn.addEventListener("click",C),r.notesList.addEventListener("click",S)}function C(e){const t=k.create(`<h2 class="title-task-title">Введіть назву нового переліку завдань:</h2>
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
    </form>`);t.show();const n=t.element().querySelector(".task-name-input");setTimeout(()=>{n.focus()},0),t.element().querySelector(".title-task-btn").addEventListener("click",s=>{s.preventDefault();const i=t.element().querySelector(".task-name-input").value.trim();i&&(c.push({taskId:Date.now(),title:i,notes:[]}),u("taskStorage",c),t.close(),p())},{once:!0})}r.toMenuBtn.addEventListener("click",N);function N(e){p()}
//# sourceMappingURL=index.js.map
