import { Game } from "./game";

const game = new Game();
game.ctx = document.querySelector('canvas').getContext('2d');

game.start();
