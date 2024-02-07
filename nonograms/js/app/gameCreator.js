import { Manager } from "./Manager.js";

export class Game {
  field = document.querySelector(".game-container");
  hintFieldLeft = document.querySelector(".game-hint-left");
  hintFieldTop = document.querySelector(".game-hint-top");
  difficulty = null;
  matrix = null;
  hint = [];
  zeroMatrix = null;
  firstClick = false;

  timerSeconds = 0;
  timerMinutes = 0;
  currentTimer = null;
  time = "00:00";

  constructor(difficulty, matrix, hint = null) {
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;
    this.firstClick = false;
    this.#createZeroMatrix();
    this.#initGame();
    this.#initHints();
    this.#timerStop();
  }

  updateGame(difficulty, matrix, hint) {
    this.difficulty = difficulty;
    this.matrix = matrix;
    this.hint = hint;
    this.firstClick = false;
    this.#createZeroMatrix();
    this.#initGame();
    this.#initHints();
    this.#timerStop();
  }

  #createZeroMatrix() {
    if (this.difficulty === "easy") {
      this.zeroMatrix = Array.from({ length: 5 }, () => Array(5).fill(0));
    } else {
      //TODO MATRIX 15 x 15
    }
  }

  loadGame(flag = false) {
    if (flag) {
      this.applyZeroMatrixToField();
    } else {
      const savedGame = localStorage.getItem("current-game");
      if (savedGame) {
        this.zeroMatrix = JSON.parse(savedGame);
        console.log(JSON.parse(savedGame), "zero matrix");
        this.applyZeroMatrixToField();
      }
    }
  }

  showSolution() {
    this.zeroMatrix = this.matrix;
    console.log(this.zeroMatrix, "show solution");
  }

  applyZeroMatrixToField() {
    const gridItems = this.field.querySelectorAll(".game-item");
    gridItems.forEach((gridItem, index) => {
      const rowIndex = Math.floor(index / this.matrix[0].length) + 1;
      const colIndex = (index % this.matrix[0].length) + 1;
      if (this.zeroMatrix[rowIndex - 1][colIndex - 1] === 1) {
        gridItem.classList.add("game-item--active");
      } else {
        gridItem.classList.remove("game-item--active");
      }
    });
  }

  #initGame() {
    this.field.innerHTML = "";
    this.zeroMatrix.forEach((row) => {
      row.forEach((value) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("game-item");
        this.field.append(gridItem);
      });
    });

    this.field.style.gridTemplateColumns = `repeat(${this.matrix[0].length}, 1fr)`;
    this.field.style.gridTemplateRows = `repeat(${this.matrix.length}, 1fr)`;

    this.field.addEventListener("click", (event) => {
      this.#fieldClickHandler(event);
    });
    this.field.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.#fieldClickHandler(event);
    });
  }

  #initHints() {
    const hintsContainerLeft = document.createElement("div");
    hintsContainerLeft.classList.add("hints-container-left");
    const hintsContainerTop = document.createElement("div");
    hintsContainerTop.classList.add("hints-container-right");
    const { rowHints, colHints } = this.hint;

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
    if (this.firstClick === true) {
    } else {
      this.#timerStart();
    }
    this.firstClick = true;
    const gridItem = e.target;
    const index = Array.from(this.field.children).indexOf(gridItem);
    const rowIndex = Math.floor(index / this.matrix[0].length) + 1;
    const colIndex = (index % this.matrix[0].length) + 1;

    if (e.type === "click") {
      if (gridItem.classList.contains("game-item--crossed")) {
        gridItem.classList.remove("game-item--crossed");
        gridItem.classList.add("game-item--active");
        this.#setZeroMatrixValue(1, rowIndex, colIndex, gridItem);
      } else {
        if (gridItem.classList.contains("game-item--active")) {
          gridItem.classList.remove("game-item--active");
          this.#setZeroMatrixValue(0, rowIndex, colIndex, gridItem);
        } else {
          this.#setZeroMatrixValue(1, rowIndex, colIndex, gridItem);
          gridItem.classList.add("game-item--active");
        }
      }
    } else if (e.type === "contextmenu") {
      if (gridItem.classList.contains("game-item--active")) {
        gridItem.classList.remove("game-item--active");
        gridItem.classList.add("game-item--crossed");
        this.#setZeroMatrixValue(0, rowIndex, colIndex, gridItem);
      } else {
        if (gridItem.classList.contains("game-item--crossed")) {
          gridItem.classList.remove("game-item--crossed");
        } else {
          gridItem.classList.add("game-item--crossed");
        }
      }
    }

    this.#winCheck(this.zeroMatrix, Manager.currentGame);
    this.#saveGame();
  }

  #saveGame() {
    localStorage.setItem("current-game", JSON.stringify(this.zeroMatrix));
  }

  #timerStart() {
    this.currentTimer = setInterval(() => this.#updateTimer(), 1000);
  }

  #timerStop() {
    clearInterval(this.currentTimer);
    this.timerMinutes = 0;
    this.timerSeconds = 0;
    this.time = "00:00";
    Manager.timerField.textContent = this.time;
  }

  #updateTimer() {
    this.timerSeconds++;
    if (this.timerSeconds >= 60) {
      this.timerSeconds = 0;
      this.timerMinutes++;
    }
    this.time = `${
      this.timerMinutes < 10 ? "0" + this.timerMinutes : this.timerMinutes
    }:${this.timerSeconds < 10 ? "0" + this.timerSeconds : this.timerSeconds}`;
    Manager.timerField.textContent = this.time;
    Manager.currentGameTime = this.time;
  }

  #setZeroMatrixValue(value, row, col, gridItem) {
    this.zeroMatrix[row - 1][col - 1] = value;
  }

  #winCheck(userMatrix, originalMatrix) {
    for (let i = 0; i < originalMatrix.length; i++) {
      for (let j = 0; j < originalMatrix[i].length; j++) {
        if (originalMatrix[i][j] !== userMatrix[i][j]) {
          return;
        }
      }
    }
    this.#timerStop();
    Manager.endGame();
  }
}
