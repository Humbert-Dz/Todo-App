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

  // * referencias HTML
  //refererencia a input para agregar un todo
  const newDescriptionInput = document.querySelector(elementsIDs.NewTodoInput);
  //referencia a la lista donde se renderizarán los todos
  const todoList = document.querySelector(elementsIDs.listaTODOS);

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

  //al contenedor de todos, agregamos un evento click
  todoList.addEventListener("click", (e) => {
    // lo que hace e.target es tomar el elemento sobre el cual hicimos click, ya sea label/ button
    // lo que hace el método closest es retornar el elemento padre más cercano del elemento sobre el que se hace click
    // que tenga el atributo data-id

    const element = e.target.closest("[data-id]");

    todoStore.toggleTodo(element.getAttribute("data-id"));

    renderizarTodos();
  });
};

export default App;
