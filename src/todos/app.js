import html from "./app.html?raw"; //le decimos que importe todo como HTML (?raw), del archivo app.html
import todoStore from "../store/todo-store";
import { renderTodos } from "./use-cases";

//* objeto literal para recopilar ids de elementos segun nos interese
const elementsIDs = {
  //cuadro donde se van a meter los todos
  listaTODOS: ".todo-list",
  //inout donde se ingresa el todo
  NewTodoInput: "#new-todo-input",
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

  //refererencia a input para agregar un
  const newDescriptionInput = document.querySelector(elementsIDs.NewTodoInput);

  //agregamos un evento al input de agregar todo
  newDescriptionInput.addEventListener("keyup", (e) => {
    //si la tecla presionada no es el enter (cada tecla tiene un keyCode, el del enter es 13)
    if (e.keyCode !== 13) return;

    // si el elemento despues de quitar espacios en blanco al inicio y fin, tiene menos de 5 caracteres
    //se sale del evento
    if (e.target.value.trim().length < 5) return;

    //imprime en consola el valor
    console.log(e.target.value);

    //al store agrega el valor del input, que es la descripcion del todo, (lo que se tiene que hacer)
    todoStore.addTodo(e.target.value);

    //limpiamos el input para agregar un nuevo todo
    newDescriptionInput.value = "";

    //renderiza los todos
    renderizarTodos();
  });
};

export default App;
