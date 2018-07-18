import { GameState } from './GameState';
import { PlayScreen } from './PlayScreen';

export class CountDownScreen extends GameState {
    public static Name = 'count down';
    private numberArt: string[][] = [[
        'oooo',
        '   o',
        '   o',
        'oooo',
        '   o',
        '   o',
        'oooo',
    ], [
        'oooo',
        '   o',
        '   o',
        'oooo',
        'o   ',
        'o   ',
        'oooo',
    ], [
        ' o ',
        'oo ',
        ' o ',
        ' o ',
        ' o ',
        ' o ',
        'ooo',
    ]];
    private currentArt = 0;
    private startTime: number;
    private offset = 0;

    public advanceFrame(): void {
        const elapsedSecs = Math.floor((Date.now() - this.startTime) / 1000);
        if (elapsedSecs > 2) {
            this.ctx.switchState(PlayScreen.Name);
        } else {
            this.currentArt = elapsedSecs;
        }
        this.offset += 1;
    }

    public draw(): void {
        const g = this.ctx.g2D;
        for (let i = 0; i < this.ctx.rows; i++) {
            for (let j = 0; j < this.ctx.cols; j++) {
                const x = (i - this.ctx.rows / 2) / 2;
                const y = (j - this.ctx.cols / 2) / 2;
                g.fillStyle = 'hsl(' + Math.floor(this.offset + 10 * Math.sqrt(x * x + y * y)) + ',80%,50%)';
                g.fillRect(j * this.ctx.tileSize, i * this.ctx.tileSize, 10, 10);
            }
          }
        g.fillStyle = 'black';
        g.beginPath();
        g.arc(this.ctx.width / 2, this.ctx.height / 2, 24, 0, 2 * Math.PI, false);
        g.fill();
        this.drawCenteredArt(this.numberArt[this.currentArt], 'white');
    }

    public start(): void {
        this.startTime = Date.now();
    }
}
