(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const L=`<header class="header">\r
  <h1>Tus tareas</h1>\r
  <input\r
    id="new-todo-input"\r
    class="new-todo"\r
    placeholder="¿Qué necesitas hacer?"\r
    accesskey="n"\r
    minlength="5"\r
    autofocus\r
  />\r
  <span class="gradiente"></span>\r
</header>\r
\r
<!-- This section should be hidden by default and shown when there are todos -->\r
<section class="main">\r
  <ul class="todo-list"></ul>\r
</section>\r
\r
<!-- This footer should hidden by default and shown when there are todos -->\r
<footer class="footer">\r
  <!-- This should be "0 items left" by default -->\r
  <span class="todo-count"\r
    ><strong id="pending-count">0</strong> pendiente(s)</span\r
  >\r
  <!-- Remove this if you don't implement routing -->\r
  <ul class="filters">\r
    <li>\r
      <a class="filtro selected" id="All">Todos</a>\r
    </li>\r
    <li>\r
      <a class="filtro" id="Pending">Pendientes</a>\r
    </li>\r
    <li>\r
      <a class="filtro" id="Completed">Completados</a>\r
    </li>\r
  </ul>\r
  <!-- Hidden if no completed items are left ↓ -->\r
  <button class="clear-completed" id="clear-completed">\r
    Borrar completados\r
  </button>\r
</footer>\r
`;let h;const S=new Uint8Array(16);function v(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(S)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function A(e,t=0){return i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]}const O=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:O};function P(e,t,s){if(y.randomUUID&&!t&&!e)return y.randomUUID();e=e||{};const l=e.random||(e.rng||v)();if(l[6]=l[6]&15|64,l[8]=l[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=l[o];return t}return A(l)}//!vamos a usar una clase simplemente para reafirmar conocimientos
class I{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"All",Completed:"Completed",Pending:"Pending"},d={todos:[],filter:a.All};//!funcion que indica que se inicializa el store, o que simplemente se cargó con exito
const q=()=>{T(),console.log("InitStore 🥑")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},m=()=>{const e=JSON.stringify(d);localStorage.setItem("state",e)},w=(e=a.All)=>({[a.All]:d.todos,[a.Completed]:d.todos.filter(s=>s.done),[a.Pending]:d.todos.filter(s=>!s.done)})[e]||new Error(`Option ${e} is invalid`),C=e=>{if(!e)throw new Error("Description is required");d.todos.push(new I(e)),m()},D=e=>{if(!e)throw new Error("todoId is required");const t=d.todos.find(s=>s.id===e);t.done=!t.done,m()},U=e=>{if(!e)throw new Error("todoId is required");d.todos=d.todos.filter(t=>t.id!==e),m()},x=()=>{d.todos=d.todos.filter(e=>!e.done),m()},F=(e=a.All)=>{d.filter=e,m()},H=()=>d.filter,N=()=>w(a.Pending).length,c={addTodo:C,deleteCompleted:x,deleteTodo:U,getCurrentFilter:H,getTodos:w,initStore:q,loadStore:T,setFilter:F,toggleTodo:D,getCurrentTodoPending:N},k=e=>{if(!e)throw new Error("todo es requerido");const{id:t,done:s,description:l}=e,o=`
      <label class="contenedor"'>
      <div id="checkLabelTodo">
      <input type="checkbox" class="" ${s?"checked":""} />
      <div class="checkmark"></div>
      </div>
      ${l}
      <button class="destroy" id="destroy"></button>
      </label>
    `,n=document.createElement("li");return n.classList.add("list_item"),n.setAttribute("data-id",t),s&&n.classList.add("completed"),n.innerHTML=o,n};let p;const M=(e,t=[])=>{if(!e)throw new Error("Es necesario id del elemento donde se renderizarán los todos");if(!t)throw new Error("Es necesario tener los todos");if(p||(p=document.querySelector(e)),!p)throw new Error("El elemento no existe");p.innerHTML="",t.forEach(s=>{p.append(k(s))})},u={listaTODOS:".todo-list",NewTodoInput:"#new-todo-input",btnEliminarTodos:"#clear-completed",anclasFiltro:".filtro",LabelPendientes:"#pending-count"},f=()=>{const e=document.querySelector(u.LabelPendientes);e.innerText=c.getCurrentTodoPending()},R=e=>{//!función que renderiza, muestra los tod
const t=()=>{const r=c.getTodos(c.getCurrentFilter());M(u.listaTODOS,r)};//! cuando la funcion App se llama esto de ejecuta de manera automática
(()=>{const r=document.createElement("div");r.classList.add("container"),r.innerHTML=L,document.querySelector(e).append(r),t(),f()})();const s=document.querySelector(u.NewTodoInput),l=document.querySelector(u.listaTODOS);s.addEventListener("keyup",r=>{r.keyCode===13&&(r.target.value.trim().length<5||(console.log(r.target.value),c.addTodo(r.target.value),s.value="",t(),f()))}),l.addEventListener("click",r=>{const g=r.target.closest("[data-id]");r.target.id==="destroy"?c.deleteTodo(g.getAttribute("data-id")):c.toggleTodo(g.getAttribute("data-id")),t(),f()}),document.querySelector(u.btnEliminarTodos).addEventListener("click",()=>{c.deleteCompleted(),t(),f()});const n=document.querySelectorAll(u.anclasFiltro);n.forEach(r=>{r.addEventListener("click",g=>{n.forEach(E=>E.classList.remove("selected")),r.classList.add("selected");const b=g.target.id;c.setFilter(b),t()})})};c.initStore();R("#app");
