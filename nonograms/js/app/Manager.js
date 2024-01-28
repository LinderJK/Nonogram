import { Game } from "./gameCreator.js";

export class Manager {
  gameField = document.querySelector(".game-container");
  game = null;

  constructor() {
    new Game(this.gameField);
  }
}
