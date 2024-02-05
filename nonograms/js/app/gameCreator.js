import { Manager } from "./Manager.js";

export class Game {
  field = document.querySelector(".game-container");
  hintFieldLeft = document.querySelector(".game-hint-left");
  hintFieldTop = document.querySelector(".game-hint-top");
  difficulty = null;
  matrix = null;
  hint = [];
  zeroMatrix = null;

  constructor(difficulty, matrix, hint = null) {
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;
    this.#createZeroMatrix();
    this.#initGame();
    this.#initHints();
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

  updateGame(difficulty, matrix, hint) {
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;
    this.#createZeroMatrix();
    this.#initGame();
    this.#initHints();
  }

  #createZeroMatrix() {
    if (this.difficulty === "easy") {
      this.zeroMatrix = Array.from({ length: 5 }, () => Array(5).fill(0));
      // console.log(this.zeroMatrix, "zero matrix");
    } else {
      //TODO MATRIX 15 x 15
    }
  }

  #initGame() {
    // console.log(this.field);
    this.field.innerHTML = "";
    this.zeroMatrix.forEach((row) => {
      row.forEach((value) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("game-item");
        // gridItem.textContent = `${value}`;
        // gridItem.style.backgroundColor = value === 1 ? "lightblue" : "white";
        this.field.append(gridItem);
      });
    });

    this.field.style.gridTemplateColumns = `repeat(${this.matrix[0].length}, 1fr)`;
    this.field.style.gridTemplateRows = `repeat(${this.matrix.length}, 1fr)`;

    // console.log(this.field, "field");
    this.field.addEventListener("click", (event) => {
      this.#fieldClickHandler(event);
    });
  }

  #initHints() {
    const hintsContainerLeft = document.createElement("div");
    hintsContainerLeft.classList.add("hints-container-left");
    const hintsContainerTop = document.createElement("div");
    hintsContainerTop.classList.add("hints-container-right");

    const { rowHints, colHints } = this.hint;
    // console.log(this.hint, rowHints, colHints, "hints");

    rowHints.forEach((hintRow) => {
      const hintRowContainer = document.createElement("div");
      hintRowContainer.classList.add("hint-row");

      hintRow.forEach((hint) => {
        const hintItem = document.createElement("div");
        hintItem.classList.add("hint-item");
        hintItem.textContent = `${hint}`;
        hintRowContainer.append(hintItem);
      });

      hintsContainerLeft.append(hintRowContainer);
    });

    colHints.forEach((hintCol) => {
      const hintColContainer = document.createElement("div");
      hintColContainer.classList.add("hint-col");

      hintCol.forEach((hint) => {
        const hintItem = document.createElement("div");
        hintItem.classList.add("hint-item");
        hintItem.textContent = `${hint}`;
        hintColContainer.append(hintItem);
      });

      hintsContainerTop.append(hintColContainer);
    });

    this.hintFieldLeft.innerHTML = "";
    this.hintFieldLeft.append(hintsContainerLeft);
    this.hintFieldTop.innerHTML = "";
    this.hintFieldTop.append(hintsContainerTop);
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
    console.log(this.zeroMatrix, Manager.currentGame, '"GAME ZERO MATRIX"');
    this.#winCheck(this.zeroMatrix, Manager.currentGame);
  }

  #setZeroMatrixValue(value, row, col, gridItem) {
    this.zeroMatrix[row - 1][col - 1] = value;
    // gridItem.textContent = `${value}`;
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
