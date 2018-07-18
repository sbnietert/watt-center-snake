import * as io from 'socket.io-client';
import SERVER_ENDPOINT from '../serverSettings';
type SocketListener = (socketId: string, event: string) => void;

export class IO {
    private listeners: SocketListener[] = [];
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(SERVER_ENDPOINT + '/display');
    }

    public addListener(listener: SocketListener) {
        this.socket.on('message', listener);
        this.listeners.push(listener);
    }

    public clearListeners() {
        for (const listener of this.listeners) {
            this.socket.removeListener('message', listener);
        }
        this.listeners = [];
    }

    public sendMessage(socketId: string, message: string) {
        this.socket.emit(socketId, message);
    }
}
