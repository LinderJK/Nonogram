import { Game } from "./gameCreator.js";

export class Manager {
  static btn1 = null;
  static btn2 = null;
  static easyModeBtn = null;
  static gameField = null;
  static timerField = null;
  static currentGameTime = null;
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

  static init() {
    this.btnReset = document.querySelector("#reset-game");
    this.btn2 = document.querySelector(".btn-game2");
    this.gameField = document.querySelector(".game-container");
    this.btnLoadGame = document.querySelector("#current-game");
    this.easyModeBtn = document.querySelectorAll("#btn-easy a");
    this.timerField = document.querySelector(".game-timer");
    this.btnRandomGame = document.querySelector("#random-game");
    this.currentGame = this.gamesMatrix.get("game1");
    this.currentHint = this.generateHints(this.currentGame);
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
    this.currentHint = this.generateHints(this.currentGame);

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

    this.btnLoadGame.addEventListener("click", () => {
      this.game.loadGame();
    });

    this.btnRandomGame.addEventListener("click", () => {
      this.getRandomGame();
    });
  }

  static getRandomGame() {
    const keysArray = Array.from(this.gamesMatrix.keys());
    const randomIndex = Math.floor(Math.random() * keysArray.length);
    const randomKey = keysArray[randomIndex];
    this.createNewGame(randomKey);
  }

  static information() {}

  static endGame() {
    const field = document.querySelector(".game-end");
    field.innerHTML = "";
    const textField = document.createElement("p");
    textField.textContent = `Отлично! Вы решили нонограмму за ${this.currentGameTime}!`;
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
