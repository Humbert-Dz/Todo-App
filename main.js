import "./style.css";
import { App } from "./src/todos/app";
import initStore from "./src/store/todo-store";

//iniciamos el store, manda el mensae de store iniciado
initStore.initStore();

//#app hace referencia al id del div en index.html, la función App agrega html crudo en el div con id #app
App("#app");
