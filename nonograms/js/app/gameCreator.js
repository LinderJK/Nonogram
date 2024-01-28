export class Game {
  field = null;
  gameDifficulty = "easy";

  constructor(field) {
    this.field = field;

    this.init();
  }

  init() {
    console.log("init Game");
  }
}
