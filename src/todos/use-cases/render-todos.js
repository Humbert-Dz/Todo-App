import { createTodoHTML } from "./"; // importa la funcion que envuelve los todos en html

let element;

/**
 *  Función que permite renderizar los todos en HTML
 * @param {String} elementID donde se renderizan los todos
 * @param {Todo} todos tipo todo (un objeto de todo)
 */
export const renderTodos = (elementID, todos = []) => {
  //validaciones si no existen los argumentos
  if (!elementID)
    throw new Error(
      "Es necesario id del elemento donde se renderizarán los todos"
    );

  if (!todos) throw new Error("Es necesario tener los todos");

  //si no existe el elemento entonces le asignamos el selector
  if (!element) element = document.querySelector(elementID);

  //si no encuentra el elemento, lanza un errro
  if (!element) throw new Error(`El elemento no existe`);

  //purgamos el elemento
  element.innerHTML = "";

  //por cadal todo del arreglo de todos vamos a insertarlo en la lista de todos
  // usamos la función createTodoHTML que envuelve el todo en HTML
  todos.forEach((todo) => {
    element.append(createTodoHTML(todo));
  });
};
