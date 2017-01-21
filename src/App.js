import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import logo from './logo.svg';
import './App.css';
import YouTube from './components/YouTube'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: this.createPlaylist(),
        };
        this.onClick = this.onClick.bind(this);
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
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2>Primo for Music Lovers</h2>
                </div>
                <TextField ref='inputText' hintText={this.props.defaultText} floatingLabelText="VideoID"/>
                <FlatButton label="ADD" onClick={this.onClick} />
                <YouTube className="App-youtube" ref='youtube' playlist={this.state.playlist}/>
                <div className="App-youtube-mask" />
            </div>
          </MuiThemeProvider>
        );
    };

    onClick(e) {
        const id = this.refs.inputText.getValue().trim();
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({videoid: `${id}`})
        });
        this.refs.inputText.input.value = null;
        this.refs.inputText.setState({ value: null})
    };
}

App.propTypes = {
    videos: React.PropTypes.array.isRequired,
    defaultText: React.PropTypes.string.isRequired
};

App.defaultProps = {
    videos: [],
    defaultText: 'Please add a VideoID'
};

export default App;
