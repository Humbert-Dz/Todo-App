//Aquí vamos a centralizar información importante de nuestra app
//*o informacion que queremos que esté de manera global en la app
//importamos la clase Todo
import { Todo } from "../todos/models/todo.model";

//* "enumeracion" con un filtro de las tareas, es solo un objeto literal
const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

/**
 * *objeto literal
 *  contiene:
 * *un arreglo con las tareas
 * *un filtro
 */
const state = {
  todos: [],
  //uso del filtro
  filter: Filters.All,
};

//!funcion que indica que se inicializa el store, o que simplemente se cargó con exito
const initStore = () => {
  //carga el storage
  loadStore();

  console.log("InitStore 🥑");
};

/**
 * !Funcion que carga el local storage en caso de existir
 * @returns
 */
const loadStore = () => {
  //validamos que si no existe el item local storage simplemente retornamos
  if (!localStorage.getItem("state")) return;

  //hacemos una desestructuracion, obtenemos el json que se encuentra en el local storage con la llave state
  // y la convertimos a su tipo respectivo, asignandolo con la destructuración la cual tiene valores por defecto
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );

  //asignamos los valores correspondientes
  state.todos = todos;
  state.filter = filter;
};

/**
 * !funcion que permite guardar los todos en el localStorage
 */
const saveLocalStore = () => {
  //convertimos nuestros todos en json
  const todos = JSON.stringify(state);

  //guardamos en el local storage los todos con la llave state
  localStorage.setItem("state", todos);
};

/**
 * !Función que permite obtener todos los todos
 * @param {String} filter filtro de todos
 * @returns {Array<Todo>} con el filtro indicado o error si no se encuentra
 * Si no se especifica un filtro, el filtro por defecto será all
 */
const getTodos = (filter = Filters.All) => {
  //objeto con arreglos, el contenido del arreglo es una función auto invocada
  //en cuanto coincida una busqueda, la función se ejecuta y retorna lo indicado
  const filters = {
    [Filters.All]: (() => state.todos)(),
    [Filters.Completed]: (() => state.todos.filter((todo) => todo.done))(),
    [Filters.Pending]: (() => state.todos.filter((todo) => !todo.done))(),
  };

  //se retorna el array con el filtro, si no se encuentra se retorna un error
  return filters[filter] || new Error(`Option ${filter} is invalid`);
};

/**
 * !Funcion para crear y agregar un todo
 * @param {String} description del todo
 */
const addTodo = (description) => {
  //si no se recibe la descripcion entonces se lanza un error
  if (!description) throw new Error("Description is required");

  //se agrega el nuevo todo al estado
  state.todos.push(new Todo(description));

  //guardamos el cambio en el localStorage
  saveLocalStore();
};

/**
 * !Función para cambiar el estado de completado de un todo, de true a false y viceversa
 * @param {String} todoId identificador todo
 */
const toggleTodo = (todoId) => {
  if (!todoId) throw new Error("todoId is required");

  //buscamos el elemento correspondiente a ese id
  const todo = state.todos.find((todo) => todo.id === todoId);

  //cambiamos el estado de completado
  todo.done = !todo.done;

  //guardamos el cambio en el localStorage
  saveLocalStore();
};

/**
 * !Función para eliminar un todo
 * @param {String} todoId identificador todo
 */
const deleteTodo = (todoId) => {
  //si no se recibe el id del todo, se lanza un error
  if (!todoId) throw new Error("todoId is required");

  //actualizamos los todos del estado, hacemos un filtro, se van a regresar en el mismo array todo
  // los todos que tengan el id diferente del que recibimos.
  state.todos = state.todos.filter((todo) => todo.id !== todoId);

  //guardamos el cambio en el localStorage
  saveLocalStore();
};

/**
 * !Función para eliminar todos los todos completados
 */
const deleteCompleted = () => {
  //actualizamos los todos, vamos a filtrar todos los todos
  //los todos cuyo done (completado) sea falso, se van a quedar
  state.todos = state.todos.filter((todo) => !todo.done);

  //guardamos el cambio en el localStorage
  saveLocalStore();
};

/**
 * !Función que establece un filtro a la card de todos
 * @param {Filters} newFilter
 * en caso de que no se envíe un valor, por defecto el filtro será all
 */
const setFilter = (newFilter = Filters.All) => {
  //le establecemos un filtro nuevo al filtro
  state.filter = newFilter;

  //guardamos el cambio en el localStorage
  saveLocalStore();
};

/**
 * !Función que va a permitir acceder al store de manera controlada
 * @returns el filtro actual
 */
const getCurrentFilter = () => state.filter;

/**
 * Función para obtener la cantidad de todos pendientes
 * @returns cantidad de todos pendientes
 */
const getCurrentTodoPending = () => getTodos(Filters.Pending).length;

//si no exportamos lo que tengamos aquí, como esto es un módulo, todo está encapsulado aquí mismo
export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
  getCurrentTodoPending,
};
