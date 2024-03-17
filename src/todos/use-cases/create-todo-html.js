/**
 * Función que envuelve un todo en código HTML
 * @param {Todo} todo a envolver en HTML
 */
export const createTodoHTML = (todo) => {
  //valida si no se recibe ningún todo
  if (!todo) throw new Error("todo es requerido");

  const { id, done, description } = todo;

  //constante donde envolvemos el todo
  const todoHTML = `
      <label class="contenedor"'>
      <div id="checkLabelTodo">
      <input type="checkbox" class="" ${done ? "checked" : ""} />
      <div class="checkmark"></div>
      </div>
      ${description}
      <button class="destroy" id="destroy"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></button>
      </label>
    `;

  //creamos un nuevo list item
  const liElement = document.createElement("li");

  //le agregamos una clase al li
  liElement.classList.add("list_item");

  //le agregamos el atributo data-id (identificador unico)
  liElement.setAttribute("data-id", id);

  //agregar la clase de completado si es que lo está
  if (done) {
    liElement.classList.add("completed");
  }

  liElement;
  // liElement.classList.add((todo.done) ? "completed" : "");
  //le agregamos el todo envuento en HTML al li
  liElement.innerHTML = todoHTML;

  //retornamos el li
  return liElement;
};
