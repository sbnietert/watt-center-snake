import { GameContext } from './GameContext';
import { Utils } from './Utils';

export abstract class GameState {
    protected ctx: GameContext;
    protected minTimePerFrame = 0;

    private borderColors: string[] = [];
    private lastUpdated = Date.now();

    constructor(ctx: GameContext) {
        this.ctx = ctx;
        this.randomizeBorderColors();
    }

    public update(): void {
        if (Date.now() - this.lastUpdated > this.minTimePerFrame) {
            this.advanceFrame();
            this.draw();
            this.lastUpdated = Date.now();
        }
    }

    public advanceFrame(): void {}
    public abstract draw(): void;

    public start(): void {}

    protected fillScreen(color: string): void {
        this.ctx.g2D.fillStyle = color;
        this.ctx.g2D.fillRect(0, 0, this.ctx.width, this.ctx.height);
    }

    protected drawSquare(loc: number[], color: string): void {
        this.ctx.g2D.fillStyle = color;
        this.ctx.g2D.fillRect(
            loc[1] * this.ctx.tileSize, loc[0] * this.ctx.tileSize, this.ctx.tileSize, this.ctx.tileSize);
    }

    protected drawArt(art: string[], rowOffset: number, colOffset: number, color: string): void {
        for (let i = 0; i < art.length; i++) {
            for (let j = 0; j < art[i].length; j++) {
                if (art[i][j] !== ' ') {
                    this.drawSquare([rowOffset + i, colOffset + j], color);
                }
            }
        }
    }

    protected drawCenteredArt(art: string[], color: string) {
        const rowOffset = (this.ctx.rows - art.length) / 2;
        const colOffset = (this.ctx.cols - art[0].length) / 2;
        this.drawArt(art, rowOffset, colOffset, color);
    }

    protected randomizeBorderColors(): void {
        let c = 0;

        for (let i = 0; i < this.ctx.rows; i++, c += 2) {
            this.borderColors[c] = Utils.randColor();
            this.borderColors[c + 1] = Utils.randColor();
        }

        for (let j = 0; j < this.ctx.cols; j++, c += 2) {
            this.borderColors[c] = Utils.randColor();
            this.borderColors[c + 1] = Utils.randColor();
        }
    }

    protected drawBorder(type = 'checker'): void {
        let c = 0;

        for (let i = 0; i < this.ctx.rows; i++, c += 2) {
            let color1: string;
            let color2: string;
            if (type === 'colorful') {
                color1 = this.borderColors[c];
                color2 = this.borderColors[c + 1];
            } else if (type === 'checker') {
                color1 = (i % 2) ? 'grey' : 'lightgrey';
                color2 = ((this.ctx.cols - 1 + i) % 2) ? 'grey' : 'lightgrey';
            } else {
                color1 = color2 = type;
            }

            this.drawSquare([i, 0], color1);
            this.drawSquare([i, this.ctx.cols - 1], color2);
        }

        for (let j = 0; j < this.ctx.cols; j++, c += 2) {
            let color1: string;
            let color2: string;
            if (type === 'colorful') {
                color1 = this.borderColors[c];
                color2 = this.borderColors[c + 1];
            } else if (type === 'checker') {
                color1 = (j % 2) ? 'grey' : 'lightgrey';
                color2 = ((this.ctx.rows - 1 + j) % 2) ? 'grey' : 'lightgrey';
            } else {
                color1 = color2 = type;
            }

            this.drawSquare([0, j], color1);
            this.drawSquare([this.ctx.rows - 1, j], color2);
        }
    }

    protected drawText(text: string, x: number, y: number, color: string, size: number) {
        const g = this.ctx.g2D;
        g.font = size + 'px monospace';
        g.textBaseline = 'top';
        g.fillStyle = color;
        g.fillText(text, x, y);
    }
}
