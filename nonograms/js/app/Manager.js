import { Game } from "./gameCreator.js";

export class Manager {
  btn1 = null;
  btn2 = document.querySelector(".btn-game2");
  gameField = document.querySelector(".game-container");
  gamesMatrix = new Map([
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
  gameDifficulty = "easy";
  currentGame = this.gamesMatrix.get("game1");
  game = null;

  constructor() {
    this.init();
  }

  init() {
    this.game = new Game(
      this.gameField,
      this.gameDifficulty,
      this.gamesMatrix.get("game1"),
    );
    console.log(this.gameField, "game FIELD");
    console.log(this.currentGame, "current game");
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
