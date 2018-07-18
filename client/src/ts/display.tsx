import { GameRunner } from './display/GameRunner';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const game = new GameRunner(canvas);
game.run();
