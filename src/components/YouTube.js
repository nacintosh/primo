import React from 'react';
import ReactDOM from 'react-dom';

class YouTube extends React.Component {

    constructor(props) {
        super(props);

        this.player;
        this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    onYouTubeIframeAPIReady() {
        new YT.Player(ReactDOM.findDOMNode(this.refs.player), {
            playerVars: {
                'controls': 0,
                'playsinline': 1,
                'showinfo': 0,
                'rel': 0
            },
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    onPlayerReady(event) {
        this.player = event.target;
        this.player.cuePlaylist({'playlist': this.props.playlist});
        this.player.setLoop(true);
        this.player.setShuffle(true);
    }

    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.CUED) {
            event.target.playVideo();
        }
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://www.youtube.com/iframe_api');

        const player = ReactDOM.findDOMNode(this.refs.player);
        player.appendChild(script);

        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
    }

    onNext() {
        this.player.nextVideo();
    }

    onPrev() {
        this.player.previousVideo();
    }

    render() {
        return (
            <div>
                <div className={this.props.className} ref="player"></div>
                <button onClick={this.onPrev}>prev</button>
                <button onClick={this.onNext}>next</button>
            </div>
        );
    }
}

YouTube.propTypes = {
    playlist: React.PropTypes.array.isRequired
}

YouTube.defaultProps = {
    playlist: []
};

export default YouTube;
