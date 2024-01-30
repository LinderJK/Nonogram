import { PageCreator } from "./app/pageCreator.js";
import { Manager } from "./app/Manager.js";

let manager = null;
window.addEventListener("DOMContentLoaded", (event) => {
  start();
});

async function start() {
  await PageCreator.init();
  Manager.init();
}
