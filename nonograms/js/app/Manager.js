import { Game } from "./gameCreator.js";

export class Manager {
  static btn1 = null;
  static btn2 = null;
  static easyModeBtn = null;
  static gameField = null;
  static gamesMatrix = new Map([
    [
      "game1",
      [
        [0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1],
        [0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1],
      ],
    ],

    [
      "game2",
      [
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ],
    ],
    [
      "game3",
      [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
      ],
    ],
    [
      "game4",
      [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
    ],
    [
      "game5",
      [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
      ],
    ],
  ]);
  static gameDifficulty = "easy";
  static currentGame = null;
  static currentHint = null;
  static game = null;

  // constructor() {
  //   this.init();
  // }

  static init() {
    this.btnReset = document.querySelector("#reset-game");
    this.btn2 = document.querySelector(".btn-game2");
    this.gameField = document.querySelector(".game-container");
    this.easyModeBtn = document.querySelectorAll("#btn-easy a");
    console.log(this.easyModeBtn, "easy btn");
    this.currentGame = this.gamesMatrix.get("game1");
    console.log(this.currentGame, "game");
    this.currentHint = this.generateHints(this.currentGame);
    // console.log(this.currentHint, "hints");
    const field = document.querySelector(".game-end");
    field.innerHTML = "";
    Manager.game = new Game(
      Manager.gameDifficulty,
      Manager.currentGame,
      Manager.currentHint,
    );

    this.#buttonsClickHandler();
  }

  static createNewGame(name = "game1") {
    const field = document.querySelector(".game-end");
    field.innerHTML = "";
    this.currentGame = this.gamesMatrix.get(name);
    console.log(this.currentGame, "game");
    this.currentHint = this.generateHints(this.currentGame);
    console.log(this.currentHint, "hints");
    this.game.updateGame(
      this.gameDifficulty,
      this.currentGame,
      this.currentHint,
    );
  }

  static resetGame() {
    this.game.updateGame(
      this.gameDifficulty,
      this.currentGame,
      this.currentHint,
    );
  }

  static #buttonsClickHandler() {
    this.easyModeBtn.forEach((button) => {
      button.addEventListener("click", () => {
        this.createNewGame(`${button.id}`);
        this.createNewGame(`${button.id}`);
      });
    });
    this.btnReset.addEventListener("click", () => {
      this.resetGame();
      this.resetGame();
    });
  }

  static endGame() {
    const field = document.querySelector(".game-end");
    field.innerHTML = "";
    // console.log("FFFFFIELD ", field);
    const textField = document.createElement("p");
    textField.textContent = "Отлично! Вы решили нонограмму!";
    field.append(textField);
    console.log("Поздравляю! Вы выиграли!");
  }

  static generateHints(nonogram) {
    const rows = nonogram.length;
    const cols = nonogram[0].length;

    const rowHints = [];
    const colHints = [];

    // генерация подсказок строки
    for (let i = 0; i < rows; i++) {
      const row = nonogram[i];
      const rowHint = [];
      let count = 0;
      for (let j = 0; j < cols; j++) {
        if (row[j] === 1) {
          count++;
        } else if (count > 0) {
          rowHint.push(count);
          count = 0;
        }
      }
      if (count > 0) {
        rowHint.push(count);
      }
      rowHints.push(rowHint.length > 0 ? rowHint : [0]);
    }

    // генерация подсказок столбца
    for (let j = 0; j < cols; j++) {
      const col = [];
      let count = 0;
      for (let i = 0; i < rows; i++) {
        if (nonogram[i][j] === 1) {
          count++;
        } else if (count > 0) {
          col.push(count);
          count = 0;
        }
      }
      if (count > 0) {
        col.push(count);
      }
      colHints.push(col.length > 0 ? col : [0]);
    }

    return { rowHints, colHints };
  }
}
