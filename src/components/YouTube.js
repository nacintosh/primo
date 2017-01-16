import React from 'react';
import ReactDOM from 'react-dom';

class YouTube extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerState: "INIT",
            title: ""
        };

        this.player;
        this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.onError = this.onError.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onToggle = this.onToggle.bind(this);
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
                'onStateChange': this.onPlayerStateChange,
                'onError': this.onError
            }
        });
    }

    onPlayerReady(event) {
        this.player = event.target;
        this.player.cuePlaylist({'playlist': this.props.playlist});
        this.player.setLoop(true);
        this.player.setShuffle(true);
    }

    getUrl(player) {
        const videoid = player.getPlaylist()[player.getPlaylistIndex()];
        return "https://www.googleapis.com/youtube/v3/videos?id=" + videoid + "&key=AIzaSyDjEi1e72nUfBoef6yEOnFEwW3aKU9HdV4&fields=items(snippet(title))&part=snippet"
    }

    onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.CUED) {
            event.target.playVideo();
        }

        switch (event.data) {
            case YT.PlayerState.ENDED:
                this.setState({playerState: "ENDED"});
                break;
            case YT.PlayerState.PLAYING:
                this.setState({playerState: "PLAYING"});
                fetch(this.getUrl(this.player)).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.setState({title: json.items[0]['snippet']['title']
                    });
                });
                break;
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.BUFFERING:
                this.setState({playerState: "PAUSED"});
                break;
            case YT.PlayerState.CUED:
                this.setState({playerState: "CUED"});
                break;
            default:
        }
    }

    onError(event) {
        console.log(event);
        this.onNext();
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

    onToggle() {
        switch (this.player.getPlayerState()) {
            case YT.PlayerState.PLAYING:
                this.player.pauseVideo();
                break;
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.BUFFERING:
                this.player.playVideo();
                break;
            default:

        }
    }

    render() {
        return (
            <div>
                <div className={this.props.className} ref="player"></div>
                <button onClick={this.onPrev}>prev</button>
                <button onClick={this.onToggle}>{this.state.playerState}</button>
                <button onClick={this.onNext}>next</button>
                <h2><font color="#ff9933">{this.state.title}</font></h2>
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
