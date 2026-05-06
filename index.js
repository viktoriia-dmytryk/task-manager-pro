import{S as h,b as d}from"./assets/vendor-D1F99FMn.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const r={get mainPage(){return document.querySelector(".main-page")},get mainScreen(){return document.querySelector(".main-screen")},get taskScreen(){return document.querySelector(".section-task")},get notesList(){return document.querySelector(".notes-list")},get createBtn(){return document.querySelector(".create-btn")},get listTask(){return document.querySelector(".list-task")},get formTask(){return document.querySelector(".controls-form")},get inputTask(){return document.querySelector(".task-input")},get removeBtn(){return document.querySelector(".remove-btn")},get saveBtn(){return document.querySelector(".save-btn")},get title(){return document.querySelector(".title")},get toMenuBtn(){return document.querySelector(".to-menu-btn")},themeBtn:document.querySelector(".theme-btn")};function l(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.log(n)}}function S(e){try{const t=JSON.parse(localStorage.getItem(e));return t!==null?t:null}catch(t){console.log(t)}}let u=null;function L(e){const t=e.target.closest(".notes-btn");if(e.target.closest(".delete-note-btn")&&g("Бажаєте видалити це завдання?",()=>{const o=e.target.closest(".delete-note-btn").closest(".notes-list-item");if(!o)return;const s=Number(o.querySelector(".notes-btn").dataset.id),a=c.findIndex(i=>i.taskId===s);a!==-1&&c.splice(a,1),l("taskStorage",c),b()}),t){const n=Number(t.dataset.id);u=n;const o=c.find(s=>s.taskId===n);if(!o)return;r.mainPage.innerHTML=`<section class="section-task">
    <div class="container notes">
      <h1 class="title">${y(o.title)}</h1>
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
  </section>`,h.create(r.listTask,{animation:250,easing:"cubic-bezier(0.25, 1, 0.5, 1)",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag"}),r.toMenuBtn.style.display="",m(),r.formTask.addEventListener("submit",v),r.listTask.addEventListener("change",x),r.listTask.addEventListener("click",q),r.listTask.addEventListener("click",B)}}function v(e){e.preventDefault();const t=r.inputTask.value.trim();t&&(T(t,u),m(),r.formTask.reset())}function T(e,t){const n=c.find(o=>o.taskId===t);n&&(n.notes.push({id:Date.now(),text:e,completed:!1}),l("taskStorage",c))}function m(){const e=c.find(t=>t.taskId===u);e&&(r.listTask.innerHTML=e.notes.map(t=>`
      <li class="list-item" data-id="${t.id}">
        <label class="task-label">
          <input class="check visually-hidden" type="checkbox" ${t.completed?"checked":""}/>
          <span class="checkbox-span">${t.completed?"☑️":"⬜"}</span>
          <span class="task-text ${t.completed?"strikethrough":""}"></span>
        </label>

        <button class="edit-btn" type="button">✒️</button>
        <button class="remove-smile" type="button">✖️</button>
      </li>
    `).join(""),r.listTask.querySelectorAll(".list-item").forEach(t=>{const n=Number(t.dataset.id),o=e.notes.find(s=>s.id===n);o&&(t.querySelector(".task-text").textContent=o.text)}))}function q(e){const t=e.target.closest(".remove-smile");if(console.log(e.target),!t)return;const n=t.closest(".list-item"),o=Number(n.dataset.id);g("Бажаєте видалити це завдання?",()=>{k(o),m()})}function k(e){const t=c.find(n=>n.taskId===u);t&&(t.notes=t.notes.filter(n=>n.id!==e),l("taskStorage",c))}function g(e,t){const n=d.create(`<h2 class="modal-title">${e}</h2>
    <div class="btn-box">
      <button class="del-btn modal-btn-for-style" type="button">Так</button>
      <button class="cancel-btn modal-btn-for-style" type="button">Ні</button>
    </div>`);n.show();const o=document.querySelector(".del-btn");document.querySelector(".cancel-btn").addEventListener("click",()=>{n.close()},{once:!0}),o.addEventListener("click",()=>{t(),n.close()},{once:!0})}function x(e){if(!e.target.classList.contains("check"))return;const t=e.target.closest(".list-item"),n=Number(t.dataset.id),o=e.target.closest(".task-label"),s=o.querySelector(".checkbox-span"),a=o.querySelector(".task-text"),i=c.find(p=>p.taskId===u);if(!i)return;const f=i.notes.find(p=>p.id===n);f&&(e.target.checked?(s.textContent="☑️",a.classList.add("strikethrough"),f.completed=!0):(s.textContent="⬜",a.classList.remove("strikethrough"),f.completed=!1),l("taskStorage",c))}function y(e=""){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function B(e){if(!e.target.classList.contains("edit-btn"))return;const t=r.inputTask;if(t.value.trim()){d.create('<p class="modal-title">Ви ще не завершили попереднє редагування!</p>').show();return}const n=e.target.closest(".list-item");if(!n)return;const o=Number(n.dataset.id),s=n.querySelector(".task-text").textContent;t.value=s,k(o),m()}r.toMenuBtn.style.display="none";const c=S("taskStorage")||[];function E(){return c.map(t=>`<li class="notes-list-item">
              <button class="notes-btn" type="button" data-id="${t.taskId}">${y(t.title)}</button>
              <button class="delete-note-btn">✕</button>
              
            </li>`).join("")}document.addEventListener("DOMContentLoaded",b);function b(e){r.mainPage.innerHTML=`<section class="main-screen">
        <div class="container main-container">
          <ul class="notes-list">
            <li class="notes-list-item">
              <button class="create-btn" type="button">+</button>
            </li>
          </ul>
        </div>
      </section>`,r.notesList.insertAdjacentHTML("beforeend",E()),r.toMenuBtn.style.display="none",r.createBtn.addEventListener("click",N),r.notesList.addEventListener("click",L)}function N(e){const t=d.create(`<h2 class="title-task-title">Введіть назву нового переліку завдань:</h2>
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
    </form>`);t.show();const n=t.element().querySelector(".task-name-input");setTimeout(()=>{n.focus()},0),t.element().querySelector(".title-task-btn").addEventListener("click",s=>{s.preventDefault();const i=t.element().querySelector(".task-name-input").value.trim();i&&(c.push({taskId:Date.now(),title:i,notes:[]}),l("taskStorage",c),t.close(),b())},{once:!0})}r.toMenuBtn.addEventListener("click",C);r.themeBtn.addEventListener("click",I);function C(e){b()}function I(e){const t=d.create(`<div class="theme-btn-wrapper">
      <button class="theme-choise butterfly" type="button" data-background="butterfly">Butterfly</button>
    <button class="theme-choise grass" type="button" data-background="grass">Grass</button>
    <button class="theme-choise year" type="button" data-background="year">New Year</button>
    <button class="theme-choise violet" type="button" data-background="violet">Flower</button></div>`);t.show(),t.element().querySelector(".theme-btn-wrapper").addEventListener("click",o=>{o.target.classList.contains("theme-choise")&&(t.close(),document.body.className=`theme-${o.target.dataset.background}`)},{once:!0})}
//# sourceMappingURL=index.js.map
