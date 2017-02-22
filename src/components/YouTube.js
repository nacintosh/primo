import React from 'react';
import ReactDOM from 'react-dom';
import './YouTube.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import 'whatwg-fetch';

const style = {
  margin: 12,
};

class YouTube extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerState: "INIT",
            title: '',
            comment: '',
            imgurl: ''
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

    getUrlForTitle(player) {
        const videoid = player.getPlaylist()[player.getPlaylistIndex()];
        return "https://www.googleapis.com/youtube/v3/videos?id=" + videoid + "&key=AIzaSyCNC4uC5tD-1o7S_E_OG1F3N-htbgYUukc&fields=items(snippet(title,thumbnails))&part=snippet"
    }

    getUrlForComments(player) {
        const videoid = player.getPlaylist()[player.getPlaylistIndex()];
        return 'https://www.googleapis.com/youtube/v3/commentThreads?videoId=' + videoid + '&key=AIzaSyCNC4uC5tD-1o7S_E_OG1F3N-htbgYUukc&textFormat=plainText&part=snippet&maxResults=50&fields=items(snippet(topLevelComment(snippet(textDisplay))))&order=relevance'
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
                fetch(this.getUrlForTitle(this.player)).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.setState({title: json.items[0]['snippet']['title']});
                    this.setState({imgurl: json.items[0]['snippet']['thumbnails']['medium']['url']});
                });

                fetch(this.getUrlForComments(this.player)).then((response) => {
                    return response.json();
                }).then((json) => {
                    const comment = json.items.reduce((pre, cur) => {
                        return pre + cur.snippet.topLevelComment.snippet.textDisplay + ' / ';
                    }, '');
                    this.setState({comment: comment});
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
                <p className='thumbnail-crop'>
                  <img className='thumbnail' src={this.state.imgurl} />
                </p>
                <div className='title'><font color="#ff9933">{this.state.title}</font></div>
                <h3><marquee><font color='white'>{this.state.comment}</font></marquee></h3>
                <RaisedButton label='prev' onClick={this.onPrev} />
                <RaisedButton label={this.state.playerState} style={style} onClick={this.onToggle} />
                <RaisedButton label='next' onClick={this.onNext} />
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
