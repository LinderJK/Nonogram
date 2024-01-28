import { PageCreator } from "./app/pageCreator.js";
import { Manager } from "./app/Manager.js";

let manager = null;

window.onload = start;

function start() {
  PageCreator.init();
  manager = new Manager();
}
