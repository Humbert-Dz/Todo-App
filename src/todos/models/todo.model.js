//!vamos a usar una clase simplemente para reafirmar conocimientos
/**
 * Esta clase va a ser utilizada para crear tareas
 */
export class Todo {
  /**
   * Constructor
   * @param {String} description
   *
   */
  constructor(description) {
    this.id = 1;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
