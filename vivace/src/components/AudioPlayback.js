import React, {Component} from 'react';
import {PlayerIcon} from "react-player-controls";
import PropTypes from "prop-types";
import {Media, Player, withMediaProps} from "react-media-player";
import ReduxConnectBuilder from "../utils/ReduxConnectBuilder";
import {changeVolume, startPlayback} from "../redux/actions/audio-playback";
import Slider from "./Slider";

const styles = {
    volume: {
        marginLeft: 8
    }
};

class CustomPlayPause extends Component {
    constructor(props) {
        super(props);
        if (props.provideControls) {
            props.provideControls({
                stop: this.stop,
                setVolume: this.setVolume
            });
        }
    }

    shouldComponentUpdate({media}) {
        return this.props.media.isPlaying !== media.isPlaying
    }

    _handlePlayPause = () => {
        const {onPlayPause, media: {playPause}} = this.props;
        if (onPlayPause) {
            onPlayPause();
        }
        playPause();
    };

    stop = () => {
        this.props.media.stop();
    };

    setVolume = (volume) => {
        this.props.media.setVolume(volume / 100);
    };

    render() {
        const {media, style, size} = this.props;
        const Component = media.isPlaying ? PlayerIcon.Pause : PlayerIcon.Play;
        return <Component onClick={this._handlePlayPause} width={size} height={size} style={style}/>;
    }

    static propTypes = {
        size: PropTypes.number,
        style: PropTypes.object,
        provideControls: PropTypes.func,
        onPlayPause: PropTypes.func
    };

    static defaultProps = {
        size: 15
    }
}

CustomPlayPause = withMediaProps(CustomPlayPause);


class CustomVolume extends Component {
    shouldComponentUpdate({volume}) {
        return this.props.volume !== volume
    }

    hello = (volume) => {
        console.log('volume ' + volume);
    };

    render() {
        const {volume, onVolumeChanged} = this.props;
        return (
            <div style={{width: 80}}>
                <Slider
                    value={volume}
                    onChange={this.hello}
                    max={0}
                    min={100}/>
            </div>
        )
    }

    static propTypes = {
        size: PropTypes.number,
        style: PropTypes.object,
        provideControls: PropTypes.func,
        onPlayPause: PropTypes.func,
        volume: PropTypes.number.isRequired,
        onVolumeChanged: PropTypes.func.isRequired
    };

    static defaultProps = {
        size: 15
    }
}

class AudioPlayback extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {url, playback} = this.props;
        const volume = playback ? playback.volume : null;
        const {url: urlNext, playback: playbackNext} = nextProps;
        const volumeNext = playbackNext ? playbackNext.volume : null;
        return url !== urlNext || playback !== playbackNext || volume !== volumeNext;
    }

    componentDidMount() {
        this.playerControls.setVolume(this.props.volume);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.playback && !this.props.playback) {
            this.stop();
        }
        if (prevProps.volume !== this.props.volume) {
            this.playerControls.setVolume(this.props.volume);
        }
    }

    provideControls = (playPause) => {
        this.playerControls = playPause
    };

    stop = () => {
        this.playerControls.stop();
    };

    onPlayStarted = () => {
        this.props.startPlayback(this.props.id);
    };

    onVolumeChanged = (volume) => {
        this.props.changeVolume(volume);
    };

    render() {
        const {url, style, controlButtonSize, playback, showVolumeControl} = this.props;
        return (
            <Media>
                <span style={style}>
                  <Player src={url} onPlay={this.onPlayStarted}/>
                  <CustomPlayPause provideControls={this.provideControls} size={controlButtonSize}/>
                    {showVolumeControl && playback &&
                    <CustomVolume size={controlButtonSize} style={styles.volume} volume={playback.volume}
                                  onVolumeChanged={this.onVolumeChanged}/>
                    }
                </span>
            </Media>
        );
    }
}

AudioPlayback.propTypes = {
    onPlayPause: PropTypes.func,
    url: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    style: PropTypes.object,
    controlButtonSize: PropTypes.number,
    //todo: volume doesn't work yet, because for some reason range components don't work
    showVolumeControl: PropTypes.bool
};

AudioPlayback.defaultProps = {
    controlButtonSize: 15,
    volume: 100,
    showVolumeControl: false
};

export default new ReduxConnectBuilder(AudioPlayback)
    .addActionCreator('startPlayback', startPlayback)
    .addActionCreator('changeVolume', changeVolume)
    .addMappingFunction('playback', (state, {id}) => state.audioPlayback.id === id ? state.audioPlayback : null)
    .addMappingFunction('volume', (state) => state.audioPlayback.volume)
    .build();
