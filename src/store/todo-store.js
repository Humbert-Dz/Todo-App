//Aquí vamos a centralizar información importante de nuestra app
//*o informacion que queremos que esté de manera global en la app

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
  todo: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra de marfil"),
  ],
  //uso del filtro
  filter: Filters.All,
};

//funcion que indica que se inicializa el store, o que simplemente se cargó con exito
const initStore = () => {
  console.log(state);
  console.log("InitStore 🥑");
};

const loadStore = () => {
  throw new Error("Not implemented");
};

/**
 * !Función que permite obtener todos los todos
 * @param {String} filter filtro de todos
 * Si no se especifica un filtro, el filtro por defecto será all
 */
const getTodos = (filter = Filters.All) => {
  throw new Error("Not implemented");
};

/**
 * !Funcion para crear y agregar un todo
 * @param {String} description del todo
 */
const addTodo = (description) => {
  throw new Error("Not implemented");
};

/**
 * !Función para cambiar el estado de completado de un todo
 * @param {String} todoId identificador todo
 */
const toggleTodo = (todoId) => {
  throw new Error("Not implemented");
};

/**
 * !Función para eliminar un todo
 * @param {String} todoId identificador todo
 */
const deleteTodo = (todoId) => {
  throw new Error("Not implemented");
};

/**
 * !Función para eliminar todos los todos completados
 */
const deleteCompleted = () => {
  throw new Error("Not implemented");
};

/**
 * !Función que establece un filtro a la card de todos
 * @param {String} newFilter
 * en caso de que no se envíe un valor, por defecto el filtro será all
 */
const setFilter = (newFilter = Filters.All) => {
  throw new Error("Not implemented");
};

/**
 * !Función que va a permitir acceder al store de manera controlada
 */
const getCurrentFilter = () => {
  throw new Error("Not implemented");
};

//si no exportamos lo que tengamos aquí, como esto es un módulo, todo está encapsulado aquí mismo
export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
