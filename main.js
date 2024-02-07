import "./style.css";
import { App } from "./src/todos/app";
import initStore from "./src/store/todo-store";

//iniciamos el store
initStore.initStore();

//#app hace referencia al id del div en index.html
App("#app");
