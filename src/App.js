import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import YouTube from './components/YouTube'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: this.createPlaylist()
        };
    };

    createPlaylist() {
        let playlist = []
        for (let index in this.props.videos) {
            playlist.push(this.props.videos[index].videoid);
        }
        return playlist;
    }

    render() {
        return (
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2>Welcome to Primo</h2>
                </div>
                <input type='text' ref='inputText' defaultValue='Please add a VideoID'/>
                <button onClick={this.onChangeText}>add</button>
                <YouTube className="App-youtube" ref='youtube' playlist={this.state.playlist}/>
                <div className="App-youtube-mask" />
            </div>
        );
    };

    onChangeText(e) {
        const id = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({videoid: `${id}`})
        });
    };
}

App.propTypes = {
    videos: React.PropTypes.array.isRequired
};

App.defaultProps = {
    videos: []
};

export default App;
