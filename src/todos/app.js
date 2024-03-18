import html from "./app.html?raw"; //le decimos que importe todo como HTML (?raw), del archivo app.html
import todoStore from "../store/todo-store";
import { renderTodos } from "./use-cases";

//* objeto literal para recopilar ids de elementos segun nos interese
const elementsIDs = {
  //cuadro donde se van a meter los todos
  listaTODOS: ".todo-list",
  //inout donde se ingresa el todo
  NewTodoInput: "#new-todo-input",
  //boton eliminar todosCompletados
  btnEliminarTodos: "#clear-completed",
  //anclas de filtro <a>
  anclasFiltro: ".filtro",
  //etiqueta de todos pendientes
  LabelPendientes: "#pending-count",
};

/**
 * funcion que actualiza el numero de todos pendientes en la etiqueta correspondiente
 */
const actualizarTodosPendientes = () => {
  //se llama aqui y no afuera por que si lo hacemos arriba, en ese momento aun no existe
  //ya que carga el javascript y todo lo que tiene que ver con los todos
  // y termina con el footer del contenedor, y esta etiqueta se encuentra al final
  const pendientesLabel = document.querySelector(elementsIDs.LabelPendientes);

  // actualizamos el numero de pendientes en la etiqueta
  pendientesLabel.innerText = todoStore.getCurrentTodoPending();
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

    //actualiza el numero de todos pendientes en la etiqueta
    actualizarTodosPendientes();
  })();

  // * referencias HTML
  //refererencia a input para agregar un todo
  const newDescriptionInput = document.querySelector(elementsIDs.NewTodoInput);
  //referencia a la lista donde se renderizarán los todos
  const todoList = document.querySelector(elementsIDs.listaTODOS);

  //*agregamos un evento al input de agregar todo
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

    //llamamos a la funcion que renderiza los todos
    renderizarTodos();

    //actualizamos el numero de todos pendientes
    actualizarTodosPendientes();
  });

  //*al contenedor de todos, agregamos un evento click
  todoList.addEventListener("click", (e) => {
    // lo que hace e.target es tomar el elemento sobre el cual hicimos click, ya sea label/ button
    // lo que hace el método closest es retornar el elemento padre más cercano del elemento sobre el que se hace click
    // que tenga el atributo data-id

    const element = e.target.closest("[data-id]");

    //evaluamos si el elemento al cual se hizo click tiene el id destroy
    //quiere decir que se hizo click en el boton de eliminar
    if (e.target.id === "destroy") {
      todoStore.deleteTodo(element.getAttribute("data-id"));
    } else {
      todoStore.toggleTodo(element.getAttribute("data-id"));
    }

    //llamamos a la funcion que renderiza los todos
    renderizarTodos();

    //actualizamos el numero de todos pendientes
    actualizarTodosPendientes();
  });

  //* eliminar todos completados
  const btnEliminarTodos = document.querySelector(elementsIDs.btnEliminarTodos);

  btnEliminarTodos.addEventListener("click", () => {
    todoStore.deleteCompleted();

    //llamamos a la funcion que renderiza los todos
    renderizarTodos();

    //actualizamos el numero de todos pendientes
    actualizarTodosPendientes();
  });

  //*aplicar filtros
  const anclasFiltro = document.querySelectorAll(elementsIDs.anclasFiltro);

  // a cada ancla
  anclasFiltro.forEach((ancla) => {
    // aplicamos un evento de escucha
    ancla.addEventListener("click", (event) => {
      //eliminamos la clase selected a todas las anclas
      anclasFiltro.forEach((ancla) => ancla.classList.remove("selected"));

      //cuando hacemos click en una ancla agregamos la clase selected
      ancla.classList.add("selected");
      //como filtro tomamos el id del elemento sobre el que se hizo clic
      const filtro = event.target.id;
      //aplicamos un filtro
      todoStore.setFilter(filtro);
      //llamamos a la funcion que renderiza los todos
      renderizarTodos();
    });
  });
};

export default App;
