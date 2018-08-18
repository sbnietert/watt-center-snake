import { CountDownScreen } from './CountDownScreen';
import { GameContext } from './GameContext';
import { GameState } from './GameState';
import logoURL from '../../img/logo.png';

export class StartScreen extends GameState {
    public static Name = 'start';
    private logo: HTMLImageElement;
    private passcode: string;

    constructor(ctx: GameContext) {
        super(ctx);
        this.minTimePerFrame = 250;
        this.logo = new Image();
        this.logo.src = logoURL;
        this.passcode = (1000 + Math.floor(9000 * Math.random())).toString();
    }

    public draw(): void {
        this.fillScreen('white');
        this.ctx.g2D.drawImage(this.logo, 6, 6);
        this.drawText('cuhack.it/play ' + this.passcode, 108, 12, 'black', 45);
    }

    public start(): void {
        this.ctx.io.addListener((socketId: string, event: string) => {
            if (event === this.passcode) {
                this.ctx.sharedData = socketId;
                this.ctx.switchState(CountDownScreen.Name);
                this.ctx.io.sendMessage(socketId, 'playing');
            }
        });
    }
}
