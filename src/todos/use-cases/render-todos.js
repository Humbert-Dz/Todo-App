import { createTodoHTML } from "./"; // importa la funcion que envuelve los todos en html

/**
 *  Función que permite renderizar los todos en HTML
 * @param {String} elementID donde se renderizan los todos
 * @param {Todo} todos tipo todo (un objeto de todo)
 */
export const renderTodos = (elementID, todos = []) => {
  //validaciones si no existen los argumentos
  if (!elementID)
    throw new Error("Es necesario id del elemento donde se renderizarán los todos" );

  if (!todos) throw new Error("Es necesario tener los todos");

  //referencia a la lista donde meteremos los todos
  const listaTODOS = document.querySelector(elementID);

  //por cadal todo del arreglo de todos vamos a insertarlo en la lista de todos
  // usamos la función createTodoHTML que envuelve el todo en HTML
  todos.forEach((todo) => {
    listaTODOS.append(createTodoHTML(todo));
  });
};
