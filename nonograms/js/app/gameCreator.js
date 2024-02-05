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

  // #setDifficulty(difficulty) {
  //   switch (difficulty) {
  //     case "easy":
  //       return;
  //       break;
  //     case "hard":
  //       return;
  //       break;
  //   }
  // }

  #createZeroMatrix() {
    if (this.difficulty === "easy") {
      this.zeroMatrix = Array.from({ length: 5 }, () => Array(5).fill(0));
      console.log(this.zeroMatrix, "zero matrix", Manager.currentGame);
    } else {
      //TODO MATRIX 15 x 15
    }
  }

  #init() {
    // console.log(this.field);
    this.field.innerHTML = "";
    this.zeroMatrix.forEach((row) => {
      row.forEach((value) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("game-item");
        gridItem.textContent = `${value}`;
        // gridItem.style.backgroundColor = value === 1 ? "lightblue" : "white";
        this.field.append(gridItem);
      });
    });

    this.field.style.gridTemplateColumns = `repeat(${this.matrix[0].length}, 1fr)`;
    this.field.style.gridTemplateRows = `repeat(${this.matrix.length}, 1fr)`;

    this.field.addEventListener("click", (event) =>
      this.#fieldClickHandler(event),
    );
  }

  #fieldClickHandler(e) {
    if (e.target.classList.contains("game-item")) {
      const gridItem = e.target;
      console.log(gridItem, "GRID ITEM");

      const index = Array.from(this.field.children).indexOf(gridItem);
      const rowIndex = Math.floor(index / this.matrix[0].length) + 1;
      const colIndex = (index % this.matrix[0].length) + 1;

      if (gridItem.classList.contains("game-item--active")) {
        gridItem.classList.remove("game-item--active");
        this.#setZeroMatrixValue(0, rowIndex, colIndex, gridItem);
      } else {
        this.#setZeroMatrixValue(1, rowIndex, colIndex, gridItem);
        gridItem.classList.add("game-item--active");
      }
    }

    this.#winCheck(this.zeroMatrix, Manager.currentGame);
  }

  #setZeroMatrixValue(value, row, col, gridItem) {
    this.zeroMatrix[row - 1][col - 1] = value;
    gridItem.textContent = `${value}`;
    console.log("this zero matrix value", this.zeroMatrix);
  }

  #winCheck(userMatrix, originalMatrix) {
    for (let i = 0; i < originalMatrix.length; i++) {
      for (let j = 0; j < originalMatrix[i].length; j++) {
        if (originalMatrix[i][j] !== userMatrix[i][j]) {
          return;
        }
      }
    }
    Manager.endGame();
  }
}
