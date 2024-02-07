//!vamos a usar una clase simplemente para reafirmar conocimientos
/**
 * Esta clase va a ser utilizada para crear tareas
 */

//importamos la dependencia que instalamos para generar un UUID a cada usuario
import { v4 as uuid } from "uuid";
export class Todo {
  /**
   * Constructor
   * @param {String} description
   *
   */
  constructor(description) {
    this.id = uuid();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
