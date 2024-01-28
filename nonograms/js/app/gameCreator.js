export class Game {
  field = null;
  difficulty = null;
  matrix = null;
  hint = [];
  zeroMatrix = null;

  constructor(field, difficulty, matrix, hint) {
    this.field = field;
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;

    this.#init();
  }

  #init() {
    console.log(this.field);
    this.field.innerHTML = "";

    this.matrix.forEach((row) => {
      row.forEach((value) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("game-item");
        gridItem.style.backgroundColor = value === 1 ? "lightblue" : "white";
        this.field.append(gridItem);
      });
    });

    this.field.style.gridTemplateColumns = `repeat(${this.matrix[0].length}, 1fr)`;
    this.field.style.gridTemplateRows = `repeat(${this.matrix.length}, 1fr)`;
  }
}
