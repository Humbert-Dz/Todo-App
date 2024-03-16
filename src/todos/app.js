import html from "./app.html?raw"; //le decimos que importe todo como HTML (?raw), del archivo app.html
import todoStore from "../store/todo-store";
import { renderTodos } from "./use-cases";

//* objeto literal para recopilar ids de elementos segun nos interese
const elementsIDs = {
  listaTODOS: ".todo-list",
};

/**
 * ! Funcion que agrega un div en el elemento indicado
 *
 * @param {String} elementId id del elemento donde vamos a meter algo
 */
const App = (elementId) => {
  //!función que renderiza, muestra los tod
  const renderizarTodos = () => {
    //obtine los todos, con el filtro 'todos los todos'
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());

    //llama a la función que renderia los todos, le enviamos el id del lugar donde queremos renderizar
    //y tambien la referencia al array de todos
    renderTodos(elementsIDs.listaTODOS, todos);
  };

  //! cuando la funcion App se llama esto de ejecuta de manera automática
  (() => {
    const app = document.createElement("div");
    app.classList.add("container");
    //uso de la importacion
    app.innerHTML = html;
    document.querySelector(elementId).append(app);

    //llamamos a la funcion que renderiza los todos
    renderizarTodos();
  })();
};

export default App;
