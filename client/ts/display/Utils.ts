export class Utils {
    public static randColor(): string {
        const hue = Math.floor(Math.random() * 360);
        return 'hsl(' + hue + ', 90%, 50%)';
    }
}
