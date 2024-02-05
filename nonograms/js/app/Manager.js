import { Game } from "./gameCreator.js";

export class Manager {
  static btn1 = null;
  static btn2 = null;
  static gameField = null;
  static gamesMatrix = new Map([
    [
      "game1",
      [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
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
  ]);
  static gameDifficulty = "easy";
  static currentGame = null;
  static currentHint = null;
  static game = null;

  // constructor() {
  //   this.init();
  // }

  static init() {
    this.btn1 = document.querySelector(".btn-game1");
    this.btn2 = document.querySelector(".btn-game2");
    this.gameField = document.querySelector(".game-container");
    this.currentGame = this.gamesMatrix.get("game1");
    console.log(this.currentGame, "game");
    this.currentHint = this.generateHints(this.currentGame);
    console.log(this.currentHint, "hints");

    Manager.game = new Game(
      Manager.gameDifficulty,
      Manager.currentGame,
      Manager.currentHint,
    );

    this.#buttonsClickHandler();
  }

  static createNewGame(name = "game1") {
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

  static #buttonsClickHandler() {
    this.btn1 = document.querySelector(".btn-game1");

    this.btn1.addEventListener("click", (event) => {
      console.log("work1");
      this.createNewGame();
      this.createNewGame();
    });

    this.btn2.addEventListener("click", () => {
      console.log("work2");
      this.createNewGame("game2");
      this.createNewGame("game2");
    });
  }

  static endGame() {
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
