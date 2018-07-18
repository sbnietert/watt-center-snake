import { GameContext } from './GameContext';
import { GameState } from './GameState';
import { StartScreen } from './StartScreen';

export class GameOverScreen extends GameState {
    public static Name = 'game over';

    private gameOverArt: string[] = [
        'ooooo                  ooooo                 ',
        'o                      o   o                 ',
        'o     oooo ooooo oooo  o   o o   o oooo oooo',
        'o  oo    o o o o o  o  o   o o   o o  o o    ',
        'o   o oooo o o o oooo  o   o o   o oooo o    ',
        'o   o o  o o o o o     o   o  o o  o    o    ',
        'ooooo oooo o o o oooo  ooooo   o   oooo o    ',
    ];
    private snake: number[][];

    constructor(ctx: GameContext) {
        super(ctx);
    }

    public advanceFrame(): void {}

    public draw(): void {
        this.fillScreen('black');
        this.drawBorder('red');

        for (const segment of this.snake) {
            this.drawSquare(segment, 'darkred');
        }

        this.drawCenteredArt(this.gameOverArt, 'red');
    }

    public start(): void {
        this.snake = this.ctx.sharedData as number[][];
        setTimeout(() => {
            location.reload(true);
            // this.ctx.switchState(StartScreen.Name);
        }, 3000);
    }
}
