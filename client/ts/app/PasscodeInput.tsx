import * as React from 'react';

interface IPasscodeInputProps {
    socket: SocketIOClient.Socket;
}

export class PasscodeInput extends React.Component<IPasscodeInputProps, {}> {
    public checkInput = (e: React.FormEvent<HTMLInputElement>) => {
        const pin = e.currentTarget.value;
        if (pin.length === 4) {
            this.props.socket.emit(pin);
        }
    }

    public render() {
        return <div id="passcode-input">
            <h1>Enter PIN:</h1>
            <input onChange={this.checkInput} type="number"/>
            <p>
            If no passcode is visible on the display, wait for the next game to begin.
            </p>
        </div>;
    }
}
