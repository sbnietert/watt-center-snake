import { CountDownScreen } from './CountDownScreen';
import { GameContext } from './GameContext';
import { GameOverScreen } from './GameOverScreen';
import { GameState } from './GameState';
import { IO } from './IO';
import { PlayScreen } from './PlayScreen';
import { StartScreen } from './StartScreen';

export class GameRunner {
    private states: { [type: string]: GameState } = {};
    private ctx = new GameContext((newState: string, ctx: GameContext) => {
        ctx.io.clearListeners();
        ctx.currState = newState;
        this.states[newState].start();
    });

    constructor(private canvas: HTMLCanvasElement) {
        canvas.width = this.ctx.width;
        canvas.height = this.ctx.height;
        this.ctx.g2D = canvas.getContext('2d');
        this.ctx.g2D.imageSmoothingEnabled = false;
        this.ctx.g2D.webkitImageSmoothingEnabled = false;

        this.ctx.io = new IO();
        this.states[StartScreen.Name] = new StartScreen(this.ctx);
        this.states[CountDownScreen.Name] = new CountDownScreen(this.ctx);
        this.states[PlayScreen.Name] = new PlayScreen(this.ctx);
        this.states[GameOverScreen.Name] = new GameOverScreen(this.ctx);
        this.ctx.currState = StartScreen.Name;
        this.states[StartScreen.Name].start();
    }

    public run(): void {
        this.states[this.ctx.currState].update();
        requestAnimationFrame(() => { this.run(); });
    }
}
