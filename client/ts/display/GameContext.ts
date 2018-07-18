import { IO } from './IO';

export class GameContext {
    public g2D: CanvasRenderingContext2D;
    public io: IO;

    public readonly rows = 18;
    public readonly cols = 157;
    public readonly tileSize = 4;
    public readonly width = this.cols * this.tileSize;
    public readonly height = this.rows * this.tileSize;

    public sharedData: {};
    public currState: string;

    constructor(private stateSwitcher: (newState: string, ctx: GameContext) => void) {}

    public switchState(newState: string): void {
        this.stateSwitcher(newState, this);
    }
}
