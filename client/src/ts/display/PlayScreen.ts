import { GameOverScreen } from './GameOverScreen';
import { GameState } from './GameState';
import { Utils } from './Utils';

export class PlayScreen extends GameState {
    public static Name = 'play';

    private snake: number[][];
    private snakeColors: string[];
    private powerups: number[][];
    private powerupColors: string[];
    private direction: string;
    private lastMove: string;

    private forbidden: { [dir: string]: string } = {
        d: 'u',
        l: 'r',
        r: 'l',
        u: 'd',
    };

    public advanceFrame(): void {
        const head = this.snake[this.snake.length - 1].slice();
        const changeRow = this.direction === 'u' || this.direction === 'd';
        const increment = this.direction === 'r' || this.direction === 'd';
        head[changeRow ? 0 : 1] += increment ? 1 : -1;

        if (head[0] === 0 || head[0] === this.ctx.rows - 1 || head[1] === 0 || head[1] === this.ctx.cols - 1) {
            this.die();
            return;
        }

        for (let i = 0; i < this.snake.length - 1; i++) {
            if (this.sameloc(this.snake[i], head)) {
                this.die();
                return;
            }
        }

        this.snake.push(head);
        this.lastMove = this.direction;

        let hitPowerup = false;
        for (let i = 0; i < this.powerups.length; i++) {
            if (this.sameloc(head, this.powerups[i])) {
                this.snakeColors[this.snake.length - 1] = this.powerupColors[i];
                this.powerups[i] = this.randloc();
                this.powerupColors[i] = Utils.randColor();
                if (this.minTimePerFrame > 50) {
                    this.minTimePerFrame -= 25;
                }
                hitPowerup = true;
            }
        }
        if (!hitPowerup) {
            this.snake.shift();
        }
    }

    public draw(): void {
        this.fillScreen('black');
        this.drawBorder('#F66733');

        for (let i = 0; i < this.snake.length; i++) {
            this.drawSquare(this.snake[i], this.snakeColors[i]);
        }
        for (let i = 0; i < this.powerups.length; i++) {
            this.drawSquare(this.powerups[i], this.powerupColors[i]);
        }
    }

    public start(): void {
        this.minTimePerFrame = 200;
        this.snake = [[Math.floor(this.ctx.rows / 2), Math.floor(this.ctx.cols / 2)]];
        this.snakeColors = [Utils.randColor()];
        this.direction = 'l';
        this.powerups = [this.randloc()];
        this.powerupColors = [Utils.randColor()];
        for (let i = 0; i < 4; i++) {
            this.powerups.push(this.randloc());
            this.powerupColors.push(Utils.randColor());
        }

        this.ctx.io.addListener((socketId: string, event: string) => {
            if (socketId === this.ctx.sharedData) {
                console.log(event);
                if (event && this.forbidden[this.lastMove] !== event) {
                    this.direction = event;
                }
            }
        });
    }

    private randi(a: number, b: number): number {
        return Math.floor(a + (b - a + 1) * Math.random());
    }

    private sameloc(a: number[], b: number[]): boolean {
        return a[0] === b[0] && a[1] === b[1];
    }

    private randloc(): number[] {
        const loc = [this.randi(1, this.ctx.rows - 2), this.randi(1, this.ctx.cols - 2)];
        for (const segment of this.snake) {
            if (this.sameloc(loc, segment)) {
                return this.randloc();
            }
        }
        return loc;
    }

    private die(): void {
        this.ctx.io.sendMessage(this.ctx.sharedData as string, 'stop-playing');
        this.ctx.sharedData = this.snake;
        this.ctx.switchState(GameOverScreen.Name);
    }
}
