import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '3ad4NsEy1tg'
        };
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        const src = 'http://www.youtube.com/embed/' + this.state.value;

        return (
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to Primo</h2>
              </div>
              <p className="App-intro"></p>
              <iframe id="player" type="text/html" width="640" height="360" src={src} />
            </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }
}

export default App;