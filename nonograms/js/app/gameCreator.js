import { Manager } from "./Manager.js";

export class Game {
  field = null;
  difficulty = null;
  matrix = null;
  hint = [];
  zeroMatrix = null;

  constructor(field, difficulty, matrix, hint = null) {
    this.field = field;
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;

    this.#createZeroMatrix();
    this.#init();
  }

  #setDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        return;
        break;
      case "hard":
        return;
        break;
    }
  }

  #createZeroMatrix() {
    if (this.difficulty === "easy") {
      this.zeroMatrix = Array.from({ length: 5 }, () => Array(5).fill(0));
      console.log(this.zeroMatrix, "zero matrix", Manager.currentGame);
    } else {
      //TODO MATRIX 15 x 15
    }
    this.#init();
  }

  #init() {
    // console.log(this.field);
    this.field.innerHTML = "";
    this.zeroMatrix.forEach((row) => {
      row.forEach((value) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("game-item");

        // gridItem.style.backgroundColor = value === 1 ? "lightblue" : "white";
        this.field.append(gridItem);
      });
    });

    this.field.style.gridTemplateColumns = `repeat(${this.matrix[0].length}, 1fr)`;
    this.field.style.gridTemplateRows = `repeat(${this.matrix.length}, 1fr)`;
  }
}
