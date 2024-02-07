//Aquí vamos a centralizar información importante de nuestra app
// o informacion que queremos que esté de manera global en la app

import { Todo } from "../todos/models/todo.model";

//enumeracion con lo filtro de las tareas
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

//si no exportamos lo que tengamos aquí, como esto es un módulo, todo está encapsulado aquí mismo
export default {
  initStore,
};
