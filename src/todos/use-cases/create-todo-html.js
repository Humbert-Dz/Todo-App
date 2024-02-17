/**
 * Función que envuelve un todo en código HTML
 * @param {Todo} todo a envolver en HTML
 */
export const createTodoHTML = (todo) => {
  //valida si no se recibe ningún todo
  if (!todo) throw new Error("todo es requerido");

  //constante donde envolvemos el todo
  const todoHTML = ` <li class="list_item">
    <label class="contenedor completed" data-id='${todo.id}'>
        <input type="checkbox" checked="checked">
        <div class="checkmark"></div>
        ${todo.description}
        <button class="destroy" id="destroy"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></button>
    </label>
    </li>`;

  //creamos un nuevo list item
  const liElement = document.createElement("li");
  //le agregamos una clase al li
  liElement.classList.add("list_item");
  //le agregamos el todo envuento en HTML al li
  liElement.innerHTML = todoHTML;

  //retornamos el li
  return liElement;
};
