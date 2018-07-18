import * as React from 'react';
import * as io from 'socket.io-client';
import { Gamepad } from './Gamepad';
import { PasscodeInput } from './PasscodeInput';
import SERVER_ENDPOINT from '../serverSettings';

interface IAppContainerState {
    playing: boolean;
}

const socket = io.connect(SERVER_ENDPOINT + '/app');

export class AppContainer extends React.Component<{}, IAppContainerState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            playing: false,
        };
    }

    public componentWillMount() {
      socket.on('message', (type: string) => {
          if (type === 'playing') {
              this.setState({ playing: true });
          }
          if (type === 'stop-playing') {
              this.setState({ playing: false });
          }
      });
    }

    public render() {
        return this.state.playing ? <Gamepad socket={socket}/> : <PasscodeInput socket={socket}/>;
    }
}
