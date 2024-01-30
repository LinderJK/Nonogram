import { Game } from "./gameCreator.js";

export class Manager {
  static btn1 = null;
  static btn2 = null;
  static gameField = null;
  static gamesMatrix = new Map([
    [
      "game1",
      [
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 0, 1, 1],
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
  static game = null;

  // constructor() {
  //   this.init();
  // }

  static init() {
    this.btn1 = document.querySelector(".btn-game1");
    this.btn2 = document.querySelector(".btn-game2");
    this.gameField = document.querySelector(".game-container");
    this.currentGame = this.gamesMatrix.get("game1");

    Manager.game = new Game(
      Manager.gameField,
      Manager.gameDifficulty,
      Manager.currentGame,
    );

    this.#buttonsClickHandler();
  }

  static #buttonsClickHandler() {
    // console.log(this.gameField, "game FIELD");
    // console.log(this.currentGame, "current game");
    this.btn1 = document.querySelector(".btn-game1");
    this.btn1.addEventListener("click", (event) => {
      console.log("work1");
      this.game = new Game(
        this.gameField,
        this.gameDifficulty,
        this.gamesMatrix.get("game1"),
      );
    });

    this.btn2.addEventListener("click", () => {
      console.log("work2");
      this.game = new Game(
        this.gameField,
        this.gameDifficulty,
        this.gamesMatrix.get("game2"),
      );
    });
  }
}
