import * as React from 'react';

interface IGamepadProps {
    socket: SocketIOClient.Socket;
}

interface IGamepadState {
    arrowDownStyle: {};
    arrowLeftStyle: {};
    arrowRightStyle: {};
    arrowStyle: {};
    arrowUpStyle: {};
    gamepadStyle: {};
}

export class Gamepad extends React.Component<IGamepadProps, IGamepadState> {
    constructor(props: IGamepadProps) {
        super(props);
        this.state = {
            arrowDownStyle: {},
            arrowLeftStyle: {},
            arrowRightStyle: {},
            arrowStyle: {},
            arrowUpStyle: {},
            gamepadStyle: {},
        };
    }

    public componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    public render() {
        return <div id="gamepad" style={this.state.gamepadStyle}>
            <div className="quadrant" id="u" onClick={this.handleUpPress} onTouchStart={this.handleUpPress}>
                <div className="arrow" id="ua" style={{...this.state.arrowStyle, ...this.state.arrowUpStyle}}/>
            </div>
            <div className="quadrant" id="r" onClick={this.handleRightPress} onTouchStart={this.handleRightPress}>
                <div className="arrow" id="ra" style={{...this.state.arrowStyle, ...this.state.arrowRightStyle}}/>
            </div>
            <div className="quadrant" id="l" onClick={this.handleLeftPress} onTouchStart={this.handleLeftPress}>
                <div className="arrow" id="la" style={{...this.state.arrowStyle, ...this.state.arrowLeftStyle}}/>
            </div>
            <div className="quadrant" id="d" onClick={this.handleDownPress} onTouchStart={this.handleDownPress}>
                <div className="arrow" id="da" style={{...this.state.arrowStyle, ...this.state.arrowDownStyle}}/>
            </div>
        </div>;
    }

    private updateDimensions = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const screenSize = Math.min(width, height);
        const gamepadSize = screenSize * 0.8;
        this.setState({
            arrowDownStyle: {
                left: (gamepadSize * 0.1) + 'px',
                top: (gamepadSize * 0.1) + 'px',
            },
            arrowLeftStyle: {
                right: (gamepadSize * 0.1) + 'px',
                top: (gamepadSize * 0.1) + 'px',
            },
            arrowRightStyle: {
                bottom: (gamepadSize * 0.1) + 'px',
                left: (gamepadSize * 0.1) + 'px',
            },
            arrowStyle: {
                borderRightWidth: gamepadSize / 5 + 'px',
                borderTopWidth: gamepadSize / 5 + 'px',
            },
            arrowUpStyle: {
                bottom: (gamepadSize * 0.1) + 'px',
                right: (gamepadSize * 0.1) + 'px',
            },
            gamepadStyle: {
                borderRadius: gamepadSize / 2 + 'px',
                height: gamepadSize + 'px',
                left: (width - gamepadSize) / 2 + 'px',
                top: (height - gamepadSize) / 2 + 'px',
                width: gamepadSize + 'px',
            },
        });
    }

    private handleDownPress = () => {
        this.props.socket.emit('d');
    }

    private handleLeftPress = () => {
        this.props.socket.emit('l');
    }

    private handleRightPress = () => {
        this.props.socket.emit('r');
    }

    private handleUpPress = () => {
        this.props.socket.emit('u');
    }
}
