import html from "./app.html?raw";
//le decimos que importe todo como HTML (?raw), del archivo app.html

/**
 * ! Funcion que agrega un div en el elemento indicado
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  // cuando la funcion se llama
  (() => {
    const app = document.createElement("div");
    app.classList.add('container');
    //uso de la importacion
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();
};
