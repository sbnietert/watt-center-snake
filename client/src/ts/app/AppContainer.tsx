import * as React from 'react';
import * as io from 'socket.io-client';
import { Gamepad } from './Gamepad';
import { PasscodeInput } from './PasscodeInput';

interface IAppContainerState {
    playing: boolean;
}

const socket = io.connect('ec2-34-217-61-183.us-west-2.compute.amazonaws.com:3000/app');

export class AppContainer extends React.Component<{}, IAppContainerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            playing: false,
        };
    }

    public componentWillMount() {
        console.log('mounting');
        socket.on('message', (type: string) => {
            if (type === 'playing') {
                this.setState({ playing: true });
            }
            if (type === 'stop-playing') {
                this.setState({ playing: false });
            }
            console.log(type);
        });
    }

    public render() {
        return this.state.playing ?
            <Gamepad socket={socket}/> : <PasscodeInput socket={socket}/>;
    }
}
